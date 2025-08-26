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
    tags:          [ 'Exporter', 'Utility' ],
	repository:    'https://github.com/JannisX11/blockbench-plugins/tree/master/plugins/gltf_importer',
    onload() {
        
    },
});

// MARK: 🟥 gltf import



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
