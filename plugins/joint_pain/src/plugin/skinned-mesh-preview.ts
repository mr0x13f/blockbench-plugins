import { replaceMethod } from './replace-method';
import { isVertexWeightEnabledFor } from './util';

export function loadSkinnedMeshPreview() {
    
    // Hook in after the Animator has posed the groups
    replaceMethod(Animator, 'stackAnimations', function(original, animations, in_loop, controller_blend_values = 0) {
        original(animations, in_loop, controller_blend_values);

        if (isVertexWeightEnabledFor(Project))
            skinMeshes();
    });

    // Hook in after the groups have been reset to the idle pose
    replaceMethod(Animator, 'showDefaultPose', function(original, no_matrix_update) {
        original(no_matrix_update);

        if (isVertexWeightEnabledFor(Project))
            skinMeshes();
    });

}

function skinMeshes() {
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

    // If the Groups are in idle pose (like after Animator.showDefaultPose()),
    // then it will effectively undo any skinning

    // Largely based on Mesh.preview_controller.updateGeometry() @ mesh.js:1039
    // skips changing the face indices and the outline's vertex order

    let previewMesh = element.mesh as THREE.Mesh;
    let outline = previewMesh.outline as THREE.LineSegments;
    let vertexPoints = previewMesh.vertex_points as THREE.Points;

    let transposedVertices: {[vertexId:string]:ArrayVector3} = {};

    // Transpose and store all vertices of the mesh
    for (let [vertexId, vertex] of Object.entries(element.vertices)) {

        let vertexWeights: {[groupId: string]: number }|undefined = element.jp_weights?.[vertexId];
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

    let positionBuffer: number[] = [];
    let normalBuffer:   number[] = [];

    // Build vertex position and normal buffers
    for (let face of Object.values(element.faces)) {
        if (face.vertices.length >= 3) {
            // Add transposed vertices to position buffer
            positionBuffer.push(...face.vertices.flatMap(vertexId => transposedVertices[vertexId]));

            // insert normal components as many times as there is vertices in this face
            // TODO: calculate manually as this doesnt respect the transposed vertices
            let normal = face.getNormal(true);
            normalBuffer.push(...Array(face.vertices.length).fill(normal).flatMap(x=>x));
        }
    }
    
    // Update vertex attributes
    previewMesh.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(positionBuffer), 3));
    previewMesh.geometry.setAttribute('normal',   new THREE.BufferAttribute(new Float32Array(normalBuffer), 3));
    
    let outlinePositionBuffer = outline.vertex_order!.flatMap(vertexId => transposedVertices[vertexId]);
    outline.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(outlinePositionBuffer), 3));
    
    let vertexPointPositionBuffer = Object.values(transposedVertices).flatMap(x=>x);
    vertexPoints.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(vertexPointPositionBuffer), 3));
    
    previewMesh.geometry.setAttribute('highlight', new THREE.BufferAttribute(new Uint8Array(outlinePositionBuffer.length/3).fill(previewMesh.geometry.attributes.highlight.array[0]), 1));

    // Update collision (for raycasts)
    previewMesh.geometry.computeBoundingBox();
    previewMesh.geometry.computeBoundingSphere();
    vertexPoints.geometry.computeBoundingSphere();
    outline.geometry.computeBoundingSphere();

    // Don't know why but updateGeometry() does this so we will too!
    Mesh.preview_controller.updatePixelGrid(element);
    if (Project?.view_mode == 'wireframe' && Mesh.preview_controller.fixWireframe)
        Mesh.preview_controller.fixWireframe(element);
}
