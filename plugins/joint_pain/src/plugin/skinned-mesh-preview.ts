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

    for (let mesh of meshes) {
        let previewMesh = mesh.mesh as THREE.Mesh;
        let outline = previewMesh.outline as THREE.LineSegments;
        let vertexPoints = previewMesh.vertex_points as THREE.Points;
        
        // Calculate positions
        
        // TODO:

        Mesh.preview_controller.updateGeometry(mesh);
        let vertexCount    = previewMesh.geometry.attributes['position'].count
        let position_array = Array.from(previewMesh.geometry.attributes['position'].array);

        for (let i = 0; i < position_array.length; i++) {
            position_array[i] += 8;
        }
        previewMesh.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(position_array), 3));

        // Outline
        // let outline_position_array = Array.from(previewMesh.outline.geometry.attributes['position'].array) as number[];
        // for (let i = 0; i < outline_position_array.length; i++) {
        //     outline_position_array[i] += 8;
        // }
        // previewMesh.outline.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(outline_position_array), 3));

        // Update collision (for raycasts)
		previewMesh.geometry.computeBoundingBox();
		previewMesh.geometry.computeBoundingSphere();
		// previewMesh.vertex_points.geometry.computeBoundingSphere();
		outline.geometry.computeBoundingSphere();

        setFlatNormals(previewMesh.geometry);
    }
}

function setFlatNormals(geometry: THREE.BufferGeometry) {

    let normal_array = [1];

    // TODO: iterate over indices and their vertices to find flat normals per face

    // geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normal_array), 3));
}
