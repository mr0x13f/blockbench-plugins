import { deferDelete, runDeferred } from './defer';
import { loadSkinnedMeshPreview } from './skinned-mesh-preview';
import { loadGltfImport } from './gltf-import';
import { loadGltfExport } from './gltf-export';
import { loadWeightsMode } from './weights-mode';
import { loadWeightsViewMode } from './weights-view-mode';
import { loadBlenderIntegration } from './blender-integration';
import globalStyles from './components/styles.css'
import { addStyle } from './util';
import { DeepClonedObjectProperty } from './deep-cloned-object-property';

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

        // TODO: add warning when this is changed
        // disabled -> * : WARNING: editing this project without the Joint Pain plugin installed will cause the vertex weight data to be lost!
        // four -> one : WARNING: changing from four to one weights per vertex will cause weight information to be lost! Only the most significant weight per vertex will be preserved.
        // unlimited -> four|one : WARNING: changing from unlimited to four weights per vertex will cause weight information to be lost! Only the four most significant weight per vertex will be preserved.
        // * -> unlimited : WARNING: a project with unlimited vertex weights cannot be exported with vertex weights
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
                '"Unlimited" can only be used within Blockbench. ' +
                'It cannot be exported as a glTF model.  ' +
                '',
            options: {
                'disabled':  'Disabled',
                'four':      '4 Weights per Vertex (Standard)',
                'one':       '1 Weight per Vertex (Retro)',
                'unlimited': 'Unlimited Weights per Vertex (Can\'t export)',
            },
            default: 'disabled',
        }));

        // Map of vertex ids to a map of group ids to a normalized weight number
        deferDelete(new DeepClonedObjectProperty(Mesh, 'jp_weights', {
            exposed: false,
            default: undefined,
        }));

        addStyle(globalStyles);

        loadSkinnedMeshPreview();
        loadWeightsViewMode();
        loadWeightsMode();
        loadGltfImport();
        loadGltfExport();
        loadBlenderIntegration();

    },
    
    onunload() {
        runDeferred();
    },
    
});
