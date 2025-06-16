import { deferDelete, runDeferred } from './defer';
import { loadSkinnedMeshPreview } from './skinned-mesh-preview';
import { loadGltfImport } from './gltf-import';
import { loadGltfExport } from './gltf-export';
import { loadWeightsMode } from './weights-mode';
import { loadBlenderIntegration } from './blender-integration';
import globalStyles from './components/styles.css'
import { addStyle } from './util';

BBPlugin.register('joint_pain', {
    
    title:       'Joint Pain',
    author:      '0x13F',
    description: 'Add vertex weights to your model, akin to skeletal animation',
    icon:        'rheumatology',
    version:     '1.0.0',
    variant:     'both',
    tags:        [ 'Format: Generic Model', 'Animation', 'Exporter' ],

    onload() {

        // TODO: new setting "show group pivots in edit and animate mode"

        deferDelete(new Property(ModelProject, 'enum', 'jp_vertex_weights', {
            label: 'Joint Pain: Vertex Weights',
            description: '' + 
                'Vertex Weights mode for the project. ' +
                'The number of weights per vertex determines how many different bones ' +
                'can have greater than zero influence on any given vertex. ' +
                '"Four" is common for modern styles and is the max amount supported. ' +
                'It offers the most freedom but may be harder to work with. ' +
                '"One" used to be the standard with early 3D graphics. ' +
                'It can be easier to work with and may help achieve a more authentic retro style. ' +
                '',
            default: 'disabled',
            options: {
                'disabled': 'Disabled',
                'one':      '1 Weight per Vertex (Retro)',
                'four':     '4 Weights per Vertex (Modern)',
            }
        }));

        addStyle(globalStyles);

        loadWeightsMode();
        loadSkinnedMeshPreview();
        loadGltfImport();
        loadGltfExport();
        loadBlenderIntegration();

    },
    
    onunload() {
        runDeferred();
    },
    
});
