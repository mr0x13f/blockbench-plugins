<template>
    <div class="jp-weights-panel">
        <table class="jp-weights-table">
            <tr>
                <th style="font-weight: normal">
                    <i class="fa_big icon far fa-gem"></i>
                    <span :style="{
                        'background':    mesh.backgroundGradient,
                        'border-radius': '5px',
                        'color':         '#cacad4',
                        'text-shadow':   '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                        'padding':       '2px 10px',
                        'font-weight':   'bold',
                        'font-size':     '1.1em',
                    }">
                        {{ mesh.name }}
                    </span>
                </th>
                <th v-for="(group, groupIndex) in mesh.groups" :key="groupIndex" class="jp-group-header">
                    <span v-if="groupIndex === 0">
                        <span class="jp-parent-indicator">parent group</span>
                        <br>
                        <i :style="{ color: group.color }" class="material-icons notranslate icon">folder</i>
                        <span class="jp-parent-name">{{ group.name }}</span>
                    </span>
                    <span v-else>
                        <br>
                        <i :style="{ color: group.color }" class="material-icons notranslate icon">folder</i>
                        <input type="text" :value="group.name" @focus="">
                        <i class="jp-group-remove material-icons notranslate icon">close</i>
                    </span>
                </th>
                <th>
                    <br>
                    <i class="material-icons notranslate icon">add</i>
                    <input type="text" placeholder="Add Group...">
                </th>
            </tr>
            <tr v-for="vertex in mesh.vertices" :key="vertex.id" class="jp-vertex-row">
                <td class="jp-weight-vertex-cell">
                    <div class="jp-vertex-component jp-corner jp-corner-x">{{ vertex.pos[0] }}</div>
                    <div class="jp-vertex-component jp-corner jp-corner-y">{{ vertex.pos[1] }}</div>
                    <div class="jp-vertex-component jp-corner jp-corner-z">{{ vertex.pos[2] }}</div>
                </td>
                <td v-for="(weight, groupIndex) in vertex.weights" :key="groupIndex" class="jp-weight-percentage-cell"
                    :class="{ 'jp-has-influence': weight > 0, 'jp-no-influence': weight === 0 }"
                    :style="{ '--group-color-dark': mesh.groups[groupIndex].dark }">
                    <div v-if="projectVertexWeightSetting === 'one'">
                        <input type="radio" :checked="weight > 0">
                    </div>
                    <div v-else>
                        {{ weight * 100 }}%
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">

export default {
    data: () => ({
        projectVertexWeightSetting: 'one',
        mesh: {
            name: 'arm_right',
            // background: createColorStripGradient(120, createHashColor('right_arm_upper', 0.5, 0.5), createHashColor('right_arm_lower', 0.5, 0.5), createHashColor('asdfasdfadfsas0', 0.5, 0.5)),
            backgroundGradient: 'hsl(200, 50%, 50%)',
            groups: [
                { name: 'right_arm_upper', color: 'hsl(200, 50%, 50%)', dark: 'hsl(200, 50%, 30%)' },
                { name: 'right_arm_lower', color: 'hsl(120, 50%, 50%)', dark: 'hsl(120, 50%, 30%)' },
            ],
            vertices: [
                { id: 'PCxt', pos: [-4.5005, -2.5003, -3.2502], weights: [1, 0] },
                { id: 'VzUC', pos: [-2.5,    0,       2      ], weights: [1, 0] },
                { id: 'ByEv', pos: [2.5,     0,       2      ], weights: [1, 0] },
                { id: 'D1jz', pos: [-1.5,    -4,      2.7    ], weights: [1, 0] },
                { id: 'uePO', pos: [-3.25,   0,       0      ], weights: [0, 1] },
                { id: 'Rndw', pos: [3.25,    2.5,     0      ], weights: [0, 1] },
                { id: 'jraI', pos: [-3,      0,       1.5    ], weights: [0, 1] },
                { id: 'csvZ', pos: [1.5,     2.5,     2.75   ], weights: [0, 1] },
                { id: 'zObx', pos: [1.5,     2.5,     -3.25  ], weights: [1, 0] },
                { id: 'oyg2', pos: [-2.5,    0,       2      ], weights: [1, 0] },
                { id: 'aCrN', pos: [2.5,     0,       2      ], weights: [1, 0] },
                { id: 'zUrF', pos: [-1.5,    -4,      2.7    ], weights: [1, 0] },
                { id: 'lQPJ', pos: [-3.25,   0,       0      ], weights: [0, 1] },
                { id: 'EFfh', pos: [3.25,    2.5,     0      ], weights: [0, 1] },
            ],
        }
    }),
    methods: {
        
    }
};
</script>
