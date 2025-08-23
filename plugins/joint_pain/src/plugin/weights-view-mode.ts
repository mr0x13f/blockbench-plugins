import { defer, deferRemoveElement } from './defer';
import { replaceMethod } from './replace-method';
import { isVertexWeightEnabledFor, shaderPrecisionHeader } from './util';
import weightsFragmentShader from './shaders/weightsFragmentShader.glsl';

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
        {
            class: 'select_option',
            key: 'weights',
        },
        Interface.createElement('i',
            {
                class: 'material-icons notranslate icon',
            },
            'rheumatology'
        ),
    )));

    let weightsMaterial = new THREE.ShaderMaterial({
        uniforms: {
            SHADE:      { value: settings.shading.value },
            BRIGHTNESS: { value: settings.brightness.value / 50 },
        },
        vertexShader: SolidMaterialShaders.vertShader,
        fragmentShader: shaderPrecisionHeader + weightsFragmentShader,
        side: THREE.DoubleSide
    });

    replaceMethod(Mesh.preview_controller, 'updateFaces', function (original, element) {
        if (Project?.view_mode === 'weights') {

            let previewMesh = ((element as Mesh).mesh as THREE.Mesh);
            previewMesh.material = weightsMaterial;

            this.dispatchEvent('update_faces', {element});

        } else {
            original(element);
        }
    });

}

function updateVerticesGroupColor() {



}