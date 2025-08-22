# Project setup
```js
Mesh.all.find(m => m.name === 'arm_left').jp_weights = {
    // Bottom 5 vertices -> left_arm_lower
    'D1jz': { 'becc810e-369e-2427-19e8-f5328e20de59': 1 }, 
    'PCxt': { 'becc810e-369e-2427-19e8-f5328e20de59': 1 }, 
    'Rndw': { 'becc810e-369e-2427-19e8-f5328e20de59': 1 }, 
    'csvZ': { 'becc810e-369e-2427-19e8-f5328e20de59': 1 }, 
    'jraI': { 'becc810e-369e-2427-19e8-f5328e20de59': 1 },
    // Top 5 vertices -> root
    'ByEv': { '54f1011c-8441-d602-d881-7f59e8c97913': 1 }, 
    'VzUc': { '54f1011c-8441-d602-d881-7f59e8c97913': 1 }, 
    'oyg2': { '54f1011c-8441-d602-d881-7f59e8c97913': 1 }, 
    'uePO': { '54f1011c-8441-d602-d881-7f59e8c97913': 1 }, 
    'zObx': { '54f1011c-8441-d602-d881-7f59e8c97913': 1 },
}
```

# Skinned Preview
The preview scene uses raycasts for selecting meshes and such. Three.js doesn't support raycasts against skinned meshes, so we can't use skinned meshes for displaying poses. Instead we should reposition vertices based on a virtual skeleton. This also means we don't need to replace any preview node objects like Meshes or Object3Ds.

Relevant Blockbench code: 
`animation_mode.js@282 Animation.stackAnimations() `
This functino calls `animation.getBoneAnimator(node).displayFrame(multiplier)` for each active animation when displaying a pose.

`timeline_animators.js@468 BoneAnimator.displayFrame() `
Calls `BoneAnimator.displayPosition()` etc based on calculation from `BoneAnimator.interpolate()`
Stacking is done based on "last values" from `Animator._last_values`
Each animation channel has its own instance of an Animator. The type depends on the type of channel. We only care about BoneAnimator. A BoneAnimator holds a reference to the relevant group.

We don't need to edit this, as this only sets the positions of the groups.
We need to jump in after this is done.
Probably after all bones have had their values set. This loop happens in `Animation.stackAnimations()`.

So we replace `Animation.stackAnimations()` and insert code at the end?
At this point all groups have their interpolated positions set, which normally means it's done because the meshes are parented to the groups.
Initial vertex values are set by `mesh.js@1039 NodePreviewController.updateGeometry() `
Per vertex we need to:
- Nullify parent group's transform
- Apply all relevant group transforms 

use `mesh.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(position_array), 3))`
to update vertices

# Weight View Mode

The default view modes are handled in `updateFaces() @ mesh.js:1145`
