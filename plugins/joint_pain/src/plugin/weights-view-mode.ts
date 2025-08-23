import { defer, deferRemoveElement } from './defer';
import { replaceMethod } from './replace-method';
import { isVertexWeightEnabledFor, shaderPrecisionHeader, hexColorToVector } from './util';
import weightsFragmentShader from './shaders/weightsFragmentShader.glsl';
import weightsVertextShader from './shaders/weightsVertexShader.glsl';

export function loadWeightsViewMode() {

    // Add bar item
    BarItems['view_mode'].options!['weights'] = {
        name: 'Weights',
        icon: 'rheumatology',
        condition: () => {
            if (!isVertexWeightEnabledFor(Project))
                return false;
            return !Toolbox.selected.allowed_view_modes || Toolbox.selected.allowed_view_modes.includes('weights');
        },
    };
    defer(() => delete BarItems['view_mode'].options!['weights']);
    deferRemoveElement(BarItems['view_mode'].node.appendChild(Interface.createElement('div',
        { class: 'select_option', key: 'weights' },
        Interface.createElement('i',
            { class: 'material-icons notranslate icon' },
            'rheumatology'
        )
    )));

    let weightsMaterial = new THREE.ShaderMaterial({
        uniforms: {
            SHADE:      { value: settings.shading.value },
            BRIGHTNESS: { value: settings.brightness.value / 50 },
        },
        vertexShader: weightsVertextShader,
        fragmentShader: shaderPrecisionHeader + weightsFragmentShader,
        side: THREE.DoubleSide,
    });

    replaceMethod(Mesh.preview_controller, 'updateFaces', function (original, element) {
        if (Project?.view_mode === 'weights') {

            let previewMesh = ((element as Mesh).mesh as THREE.Mesh);
            previewMesh.material = weightsMaterial;

            // TODO: do this at a different time
            updateVerticesGroupColor()

            this.dispatchEvent('update_faces', {element});

        } else {
            original(element);
        }
    });

    // TODO: maybe also do something for non-mesh elements. 

}

function updateVerticesGroupColor() {

    let meshElements = Outliner.elements
        .filter(e => e.type === 'mesh')
        .map(e => e as Mesh);

    let groupColors: {[groupId:string]:THREE.Vector3} = Object.fromEntries(Group.all.map(group =>
        [ group.uuid, hexColorToVector(markerColors[group.color].standard) ] ));

    for (let element of meshElements) {

        let previewMesh = element.mesh as THREE.Mesh;
        let weightsColorBuffer: number[] = [];

        for (let face of Object.values(element.faces)) {
            if (face.vertices.length < 3)
                continue;

            for (let vertexId of face.vertices) {
                let vertexWeights: {[groupId:string]:number}|undefined = element.jp_weights?.[vertexId] ?? {};
                let weightedAverageColor = new THREE.Vector3;
                let totalWeight = 0;

                for (let [groupId, groupWeight] of Object.entries(vertexWeights)) {
                    weightedAverageColor = weightedAverageColor.addScaledVector(groupColors[groupId], groupWeight);
                    totalWeight += totalWeight;
                }

                // If no weights were applied, use parent's color
                if (totalWeight === 0) {
                    // TODO: handle mesh without group
                    weightedAverageColor = groupColors[(element.parent as Group).uuid];
                    
                // Otherwise divide by total weight
                } else {
                    weightedAverageColor = weightedAverageColor.divideScalar(totalWeight);
                }

                weightsColorBuffer.push(...weightedAverageColor.toArray());
            }
        }

        previewMesh.geometry.setAttribute('jp_weights_color', new THREE.BufferAttribute(new Float32Array(weightsColorBuffer), 3));

    }
}
