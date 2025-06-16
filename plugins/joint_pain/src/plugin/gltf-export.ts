import { defer, deferDelete } from './defer';
import { replaceMethod } from './replace-method';

export function loadGltfExport() {
    // Edit GLTF export codec
    Codecs.gltf.export_options.jp_vertex_weights = {
        type: 'checkbox',
        label: 'Joint Pain: Export Vertex Weights (if available)',
        value: true,
    };
    defer(() => delete Codecs.gltf.export_options.jp_vertex_weights);

    replaceMethod(Codecs.gltf, 'compile', async function (original, options) {
        // Skip if export vertex weights is disabled or if project has vertex weights disabled
        if (options.jp_vertex_weights !== true || (Project!['vertex_weights'] !== 'one' && Project!['vertex_weights'] !== 'four'))
            return await original(options);

        // If export vertex weights is enabled, force armature enabled too
        if (options.jp_vertex_weights)
            options.armature = true;

        let result = await original(options);

        // TODO: build new joints and weights data
        // TODO: replace JOINTS_0 and WEIGHTS_0 data in buffer
        if (options.encoding === 'ascii') {

        } else if (options.encoding === 'binary') {

        }

        return result;
    });
}
