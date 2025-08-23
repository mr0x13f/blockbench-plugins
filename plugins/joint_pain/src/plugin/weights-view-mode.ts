import { defer } from './defer';
import { replaceMethod } from './replace-method';
import { isVertexWeightEnabledFor } from './util';

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

    replaceMethod(Mesh.preview_controller, 'updateFaces', function (original, element) {
        if (Project?.view_mode === 'weights') {

            // TODO: element.mesh.material = ???
            console.log('a')

            this.dispatchEvent('update_faces', {element});

        } else {
            original(element);
        }
    });

}
