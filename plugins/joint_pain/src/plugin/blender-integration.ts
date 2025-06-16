import { defer, deferDelete } from './defer';
import blenderScriptCreateLinkedScene from './blender_create_linked_scene.py';
import blenderScripCheckAddon from './blender_check_addon.py';

export function loadBlenderIntegration() {

    // TODO: action "Set up Blender integration..."
    //      requires "Export to Blender" and "Re-export On Save"
    //      creates linked blend file, maybe tries to copy armature? warning that its hard to change
    //      Recommends "Auto Reload Linked Libraries" Blender addon

    deferDelete(new Action('joint_pain_blender_integration', {
        name: 'Setup Blender animation integration...',
        icon: 'rheumatology',
        category: 'tools',
        click() {
            
        }
    }));
    // TODO: add to tools menu

}
