(function() {

const path = require('path');

let deferred = [];

// MARK: 🟥 plugin

Plugin.register('gltf_importer', {
    title:         'glTF Importer',
    author:        '0x13F',
    description:   'Import .GLTF and .GLB models',
    icon:          'icon-gltf',
    creation_date: '//TODO:',
    version:       '1.0.0',
    variant:       'desktop',
    min_version:   '4.12.6',
    has_changelog: false,   
    tags:          [ 'Format: Generic Model', 'Importer' ],
	repository:    'https://github.com/JannisX11/blockbench-plugins/tree/master/plugins/gltf_importer',
    onload() {
        
        deferDelete(new Action('import_gltf', {
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
        let importMenu = MenuBar.menus.file.structure.find(x => x['id'] === 'import');
        let importMenuChildren = importMenu.children;
        let objImportItemIndex = importMenuChildren.findIndex(x => (typeof x === 'string' ? x : x['id']).startsWith('import_obj'))
        importMenuChildren.splice(objImportItemIndex + 1, 0, 'import_gltf');
        defer(() => importMenuChildren.splice(importMenuChildren.indexOf('import_gltf'), 1));

        // MARK: 🟩   dialog

        let importGltfDialog = deferDelete(new Dialog('import_gltf_dialog', {
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
                    ['mesh_behavior']: {
                        type: 'select',
                        label: 'Mesh Behavior',
                        value: 'keep',
                        options: {
                            ['keep']: 'Keep meshes',
                            ['split']: 'Split disconnected mesh segments',
                            ['merge']: 'Merge all meshes into one',
                        },
                    },
                    ['nodes']: {
                        type: 'checkbox',
                        label: 'Import Nodes as Groups',
                        value: true,
                    },
                },
        
                onConfirm(options) {
        
                    importGltf(options);
        
                },
            }));

    },
    onunload() {

        for (let lambda of deferred)
            lambda();
        
    },
});

// MARK: 🟥 gltf import

function importGltf(options) {
    if (options.file == undefined)
        throw new Error('Missing glTF import file');

    console.log(options);

    // TODO: show warning if a uv coord is outside of 0..1 suggesting repeating textures
}

// MARK: 🟥 util

function defer(lambda) {
    deferred.push(lambda);
}

function deferDelete(deletable) {
    if (deletable.delete == undefined) {
        console.warn('deferDelete() called with object that isn\'t deletable: ', deletable);
        return;
    }
    defer(() => deletable.delete());
    return deletable;
}

})();
