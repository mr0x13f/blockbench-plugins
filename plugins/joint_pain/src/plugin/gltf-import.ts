import { defer, deferDelete } from './defer';

export function loadGltfImport() {
    
    deferDelete(new Action('import_gltf_weights', {
        name: 'Import glTF Model',
        icon: 'icon-gltf',
        category: 'file',
		condition: {
            modes: ['edit'],
            method: () => Format?.meshes,
        },
        click() {
            importGltfDialog.show();
        },
    }));
    // Insert import action into import menu after OBJ
    let importMenu = MenuBar.menus.file.structure.find(x => x['id'] === 'import') as CustomMenuItem;
    let importMenuChildren = importMenu.children as MenuItem[];
    let objImportItemIndex = importMenuChildren.findIndex(x => (typeof x === 'string' ? x : x['id']).startsWith('import_obj'))
    importMenuChildren.splice(objImportItemIndex + 1, 0, 'import_gltf_weights');
    defer(() => importMenuChildren.splice(importMenuChildren.indexOf('import_gltf_weights'), 1));

    let importGltfDialog = deferDelete(new Dialog('jp_import_gltf_dialog', {
        title: 'Import glTF',

        form: {
            ['file']: {
                type: 'file',
                label: 'glTF file',
                return_as: 'file',
                extensions: ['gltf', 'glb'],
                resource_id: 'gltf',
                filetype: 'glTF Model',
            },
            ['scale']: {
                type: 'number',
                label: 'Model Import Scale',
                value: Settings.get('model_export_scale'),
            },
            // ['mesh_behavior']: {
            //     type: 'select',
            //     label: 'Mesh Behavior',
            //     value: 'keep',
            //     options: {
            //         ['keep']: 'Keep meshes as-is',
            //         ['split']: 'Split disconnected mesh segments',
            //         ['merge']: 'Merge all meshes into one',
            //     },
            // },
            // ['armature']: {
            //     type: 'checkbox',
            //     label: 'Import Armature (if available)',
            //     value: true,
            // },
            // ['vertex_weights']: {
            //     type: 'checkbox',
            //     label: 'Import Vertex Weights (if available)',
            //     value: true,
            // },
        },

        onConfirm(options: GltfImportOptions) {

            importGltf(options);

            // TODO: check if vertex_weights should be imported, whether they are in the model,
            // and whether the project is set up for them

            // // No vertex weight imports, or project already has four weights
            // if (options.vertex_weights != true || Project?.jp_vertex_weights === 'four') {
            //     importGltf(options, false);

            // // Project not set up for vertex weights
            // } else if (options.vertex_weights && Project?.jp_vertex_weights == undefined || Project?.jp_vertex_weights === 'disabled') {
            //     Blockbench.showMessageBox({
            //         title: 'Import glTF',
            //         message: ''
            //     })

            // // Project set up for one weight
            // // Change to four or crunch to one
            // } else if (options.vertex_weights && Project?.jp_vertex_weights === 'one') {

            // }
        }
    }));
}

interface GltfImportOptions {
    file?: {
        content: string,
        name: string,
        path: string,
    },
    scale: number,
    mesh_behavior: boolean,
    armature: boolean,
    vertex_weights: boolean,
}

function importGltf(options: GltfImportOptions) {
    if (options.file == undefined)
        throw new Error('Missing glTF import file');

    console.log(options);
}
