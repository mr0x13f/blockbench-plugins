import { defer, deferDelete } from './defer';

export function loadGltfImport() {
    deferDelete(new Action('import_gltf_weights', {
        name: 'Import glTF Model',
        icon: 'icon-gltf',
        category: 'file',
        click() {
            importGltfDialog();
        },
    }));
    // Insert import action into import menu after OBJ
    let importMenu = MenuBar.menus.file.structure.find(x => x['id'] === 'import') as CustomMenuItem;
    let importMenuChildren = importMenu.children as MenuItem[];
    let objImportItemIndex = importMenuChildren.findIndex(x => (typeof x === 'string' ? x : x['id']).startsWith('import_obj'))
    importMenuChildren.splice(objImportItemIndex + 1, 0, 'import_gltf_weights');
    defer(() => importMenuChildren.splice(importMenuChildren.indexOf('import_gltf_weights'), 1));
}

function importGltfDialog() {

}

interface GltfImportOptions {
    scale: number,
    splitMesh: boolean,
    armature: boolean,
    vertexWeights: boolean,
}

function importGltf(path: string, options: GltfImportOptions) {

}
