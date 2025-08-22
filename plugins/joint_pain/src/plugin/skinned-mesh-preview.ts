import { replaceMethod } from './replace-method';
import { isVertexWeightEnabledFor } from './util';

export function loadSkinnedMeshPreview() {
    
    replaceMethod(Animator, 'stackAnimations', function(original, animations, in_loop, controller_blend_values = 0) {
        original(animations, in_loop, controller_blend_values);

        if (isVertexWeightEnabledFor(Project))
            skinMeshes();
    });

}

function skinMeshes() {
    console.log('skin!');

    let meshes = Outliner.elements
        .filter(e => e.type === 'mesh')
        .map(e => e as Mesh);

    meshes.forEach(skinMesh);
}

// CPU skin a mesh and its related gizmos
function skinMesh(element: Mesh) {
    // Transform vertices to the weighted average position of the assigned groups per vertex
    // Also update outline and vertex points accordingly

    // At this point all Groups' preview nodes have been posed,
    // so we don't need to care about the animations at all

    // Largely based on Mesh.preview_controller.updateGeometry() @ mesh.js:1039

    let previewMesh = element.mesh as THREE.Mesh;
    let outline = previewMesh.outline as THREE.LineSegments;
    let vertexPoints = previewMesh.vertex_points as THREE.Points;

    let transposedVertices: {[vertexId:string]:ArrayVector3} = {};
    let outlineVertexOrder = outline.vertex_order as string[];
    // TODO: we can reuse current
    // outlineVertexOrder.empty();
    
    // let indices: number[] = [];
    let positionBuffer: number[] = [];
    let normalBuffer: number[] = [];
    let vertexPointPositionBuffer: number[] = [];
    let outlinePositionBuffer: number[] = [];

    // Transpose and store all vertices of the mesh
    for (let [vertexId, vertex] of Object.entries(element.vertices)) {
        let vertexWeights: {[groupId: string]: number }|undefined = undefined;
        // If no vertex weights are set, treat as empty weights
        vertexWeights ??= {} as {[groupId:string]:number};

        // No weights, just stay idle
        let idleWorldPos = previewMesh.localToWorld(new THREE.Vector3(...vertex));
        // Vertex position in parent group's local space (not element's local space)
        let parentLocalPos = previewMesh.parent!.worldToLocal(idleWorldPos);

        // find weighted average world pos of influencing bones
        let weightedAverageWorldPos = new THREE.Vector3();
        let totalWeight = 0;
        for (let [groupId, groupWeight] of Object.entries(vertexWeights)) {
            let groupNode = Canvas.scene.getObjectByName(groupId);
            if (groupNode == undefined || !groupNode.isGroup)
                continue; // Invalid group node, simply ignore

            // TODO: this is wrong, this is as if the mesh was attached to this group directly
            // we need to find what the offset that the mesh would have to this group in idle pose,
            // then add that offset to the current actual group transform
            let worldPosAsGroupChild = groupNode.localToWorld(parentLocalPos);
            weightedAverageWorldPos = weightedAverageWorldPos.addScaledVector(worldPosAsGroupChild, groupWeight);
            // Count up total weight
            totalWeight += groupWeight;
        }

        // If no weights were applied, fall back to idle
        if (totalWeight === 0) {
            transposedVertices[vertexId] = vertex;

        // Otherwise divide by total weight and transpose to local space
        } else {
            weightedAverageWorldPos = weightedAverageWorldPos.divideScalar(totalWeight);
            // transpose weighted average world pos to element's actual local space
            let weightedAverageLocalPos = previewMesh.worldToLocal(weightedAverageWorldPos);

            transposedVertices[vertexId] = weightedAverageLocalPos.toArray();
        }
    }

    // Build vertex position buffer, face indices and outline order
    for (let [faceKey, face] of Object.entries(element.faces)) {

        if (face.vertices.length === 2) {
            // Outline
            // TODO: we can reuse current
            // outlineVertexOrder.push(face.vertices[0], face.vertices[1]);

        } else if (face.vertices.length >= 3) {

            let indexOffset = positionBuffer.length / 3;
            let faceIndices: {[vkey: string]: number} = {};
            face.vertices.forEach((vertexId, i) => {
                if (!element.vertices[vertexId])
                    throw new Error(`Face "${faceKey}" in mesh "${element.name}" contains an invalid vertex key "${vertexId}"`);

                positionBuffer.push(...transposedVertices[vertexId]);
                faceIndices[vertexId] = indexOffset + i;
            });

            // Fan out from vertex 0
            // One triangle for every vertex after the second
            // TODO: we can reuse this
            // let sortedVertices = face.getSortedVertices();
            // for (let tri = 0; tri < face.vertices.length - 2; tri++) {
            //     indices.push(faceIndices[sortedVertices[0]],
            //                  faceIndices[sortedVertices[tri + 1]],
            //                  faceIndices[sortedVertices[tri + 2]] );
            // }

            // insert normal components as many times as there is vertices in this face
            // TODO: calculate manually as this doesnt respect the warped triangles
            let normal = face.getNormal(true);
            normalBuffer.push(...Array(face.vertices.length).fill(normal).flatMap(x=>x));
        
            // Outline
            // Add line between each vertex of this face, looping back to the first at the end
            // TODO: we can reuse current
            // outlineVertexOrder.push(...sortedVertices.flatMap((vertexId, i) => [vertexId, sortedVertices[(i+1) % sortedVertices.length]]));
        }
    }
    
    // Vertex points
    vertexPointPositionBuffer.push(...Object.values(transposedVertices).flatMap(x=>x));
    // Outline
    outlinePositionBuffer.push(...outlineVertexOrder.flatMap(vertexId => transposedVertices[vertexId]));
    
    // Update geometry
    // previewMesh.geometry.setIndex(indices);
    previewMesh.geometry.setAttribute( 'position',  new THREE.BufferAttribute(new Float32Array(positionBuffer), 3));
    previewMesh.geometry.setAttribute( 'normal',    new THREE.BufferAttribute(new Float32Array(normalBuffer), 3));
    vertexPoints.geometry.setAttribute('position',  new THREE.BufferAttribute(new Float32Array(vertexPointPositionBuffer), 3));
    outline.geometry.setAttribute(     'position',  new THREE.BufferAttribute(new Float32Array(outlinePositionBuffer), 3));
    previewMesh.geometry.setAttribute( 'highlight', new THREE.BufferAttribute(new Uint8Array(outlinePositionBuffer.length/3).fill(previewMesh.geometry.attributes.highlight.array[0]), 1));

    // Update collision (for raycasts)
    previewMesh.geometry.computeBoundingBox();
    previewMesh.geometry.computeBoundingSphere();
    vertexPoints.geometry.computeBoundingSphere();
    outline.geometry.computeBoundingSphere();

    // Don't know why but updateGeometry() does this so we will too!
    Mesh.preview_controller.updatePixelGrid(element);
    if (Project?.view_mode == 'wireframe' && Mesh.preview_controller.fixWireframe)
        Mesh.preview_controller.fixWireframe(element);

    // TODO: Maybe? probably not? Depends how plugins use this event, tbd
    // Mesh.preview_controller.dispatchEvent('update_geometry', {element});
}
