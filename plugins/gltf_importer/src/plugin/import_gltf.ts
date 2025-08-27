export function importGltf(options) {
    if (options.file == undefined)
        throw new Error('Missing glTF import file');

    console.log(options);

    // TODO: show warning if a uv coord is outside of 0..1 suggesting repeating textures
}
