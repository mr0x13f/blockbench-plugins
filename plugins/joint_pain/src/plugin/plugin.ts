import { deferDelete, runDeferred } from './defer';
import { loadSkinnedMeshPreview } from './skinned-mesh-preview';
import { loadGltfImport } from './gltf-import';
import { loadGltfExport } from './gltf-export';
import { loadWeightsMode } from './weights-mode';
import { loadBlenderIntegration } from './blender-integration';

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

        deferDelete(new Property(ModelProject, 'enum', 'vertex_weights', {
            label: 'Joint Pain: Vertex Weights',
            default: 'disabled',
            options: {
                'disabled': 'Disabled',
                'one':      '1 Weight per Vertex (Retro)',
                'four':     '4 Weights per Vertex (Modern)',
            }
        }));

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
