import { deferDelete, deferRemoveStyle } from './defer';
import WeightsPanel from './components/WeightsPanel.vue';
import weightsPanelStyles from './components/weights-panel.css'

export function loadWeightsMode() {

    // TODO: hold [shift] or smn to view texture instead of weights
    // TODO: carry over vertex selection from edit mode
    // TODO: give groups colors by hashing name into a hue value hsl(hash, 50%, 50%)
    // TODO: when selected vertex(es), selection should go to top in table
    //      when editing a weight on one, it should update that to all
    // TODO: weight paint mode totally doable
    // TODO: in group dropdown, sort groups by distance to the mesh's group's pivot
    // TODO: have animation move bones instead of groups (same thing?)

    deferRemoveStyle(weightsPanelStyles);

    deferDelete(new Mode('weights', {
        name: 'Weights',
        category: 'navigate',
        condition: {
            formats: [ 'free' ],
        },
        selectElements: false,
        onSelect() {
            Interface.addSuggestedModifierKey('shift', 'Reveal texture');
            document.querySelector('.preview_view_mode_menu')?.classList.add('jp-hidden');

        },
        onUnselect() {
            Interface.removeSuggestedModifierKey('shift', 'Reveal texture');
            document.querySelector('.preview_view_mode_menu')?.classList.remove('jp-hidden');
        },
    }));
    // This feels wrong but ok
    Panels['outliner'].condition.modes.push('weights');

    deferDelete(new Panel('vertex-weights', {
        name: 'Weights',
        icon: 'rheumatology',
        condition: {
            formats: [ 'free' ],
            modes: [ 'weights' ],
        },
        default_position: {
            slot: 'bottom',
            float_position: [100, 400],
            float_size: [600, 300],
            height: 260,
        },
        component: WeightsPanel,
    }));

    deferDelete(new Panel('weights-preview', {
        icon: 'movie',
        name: 'Preview Animation',
        condition: {
            formats: [ 'free' ],
            modes: [ 'weights' ],
        },
        default_position: {
            slot: 'left_bar',
            float_position: [0, 0],
            float_size: [300, 400],
            height: 400,
        },
    }));
}

function createHashColor(input: string, saturation: number, lightness: number) {
    let hash = 0;
    for (let i = 0; i < input.length; i++) {
      hash ^= input.charCodeAt(i) + (hash << 5) + (hash >> 2);
    }
    const hue = Math.abs(hash) % 256;
    return `hsl(${hue}, ${saturation*100}%, ${lightness*100}%)`;
}

function createColorStripGradient(angle: number, ...colors: string[]) {
    return `linear-gradient(${angle}deg, ${
        colors
            // Skip last
            .filter((_, i) => i !== colors.length-1)
            // Find percentages
            .map((color, i): [string, number, number] => [color, i, 1/colors.length * (i+1) * 100])
            // For each remaining color, add the color itself and the next color at just 1% higher
            .map(([color, i, percentage]) =>
                `${color} ${percentage}%, ${colors[i+1]} ${percentage+1}%`)
            .join(', ')
    })`;
}

