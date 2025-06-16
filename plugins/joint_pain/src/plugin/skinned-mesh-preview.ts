import { deferDelete } from './defer';
import { replaceMethod } from './replace-method';
import { isVertexWeightEnabledFor } from './util';
import skinnedVertexShader from './skinnedVertexShader.glsl';

// This file is responsible for showing vertex weights in the 3D preview
// We achieve this by replacing preview nodes and texture materials
// We only do this if the project is set up for vertex weights ('one' or 'four')
//
// A Mesh element's preview node (THREE.Mesh) gets replaced with THREE.SkinnedMesh
// A Group's preview node (THREE.Object3D) gets replace with THREE.Bone
// The preview root (THREE.Object3D) is replaced with a THREE.Bone
// A THREE.Skeleton is stored as Project.skeleton, which references all bones
// The skeleton is rebuilt when a group is created, deleted or moved
// and is bound to all Mesh preview nodes (THREE.SkinnedMesh)
// Textures have their material's vertex shader edited to allow skinning
// and are kept up to date with the Project.skeleton
// 
// If vertex weights get disabled for a project, or the plugin gets disabled,
// we should undo all the changes

export function loadSkinnedMeshPreview() {
    
    // TODO: replace existing meshes with skinned
    // TODO: keep skinned meshes outside of groups, or keep groups without translation

    // TODO: edit materials:
    //       change vertex shader to take weights
    //       add uniforms for bone transforms
    //       DEFINE for whether to do skinning and # of bones
    //       then set material.needsUpdate = true
    //       might need to add another transform for the offset between the mesh and its group (bone)

    // TODO: replace Canvas.outlines with a Bone so it can be the root bone

    // TODO: recreate Project.skeleton each time a group is created, moved or deleted
    //       also update the reference to the skeleton in all meshes

    // Make meshes be represented by a THREE.SkinnedMesh instead of a THREE.Mesh
    // We hook into the mesh preview controller's updateTransform() method
    // to relpace the THREE.Mesh with a THREE.SkinnedMesh
    // if we haven't done so already
    // See mesh.js @ 1000
    replaceMethod(Mesh.preview_controller, 'updateTransform', function (original, element) {
        if (isVertexWeightEnabledFor(Project) === false)
            return original(element);

        if (!((element as Mesh).mesh instanceof THREE.SkinnedMesh))
            replaceElementMeshWithSkinnedMesh(element as OutlinerElement);
        
        original(element);
    });

    // Update vertex weights along with geometry
    // See mesh.js @ 1039
    replaceMethod(Mesh.preview_controller, 'updateGeometry', function (original, element) {
        if (isVertexWeightEnabledFor(Project) === false)
            return original(element);

        original(element);
        
        if (element['mesh'] instanceof THREE.SkinnedMesh)
            updateSkinnedMeshAttributes(element);
    });

    // Make groups be represented by a THREE.Bone instead of a THREE.Object3D
    // See group.js @ 572
    replaceMethod(Group.preview_controller, 'setup', function (original, group) {
        if (isVertexWeightEnabledFor(Project) === false)
            return original(group);

        let bone = new THREE.Bone();
        bone.name = group.uuid;
        bone['isGroup'] = true;
        Project!.nodes_3d[group.uuid] = bone;
        this.dispatchEvent('update_transform', {group});
    });

    // Initialize project on select
    deferDelete(Blockbench.on('select_project', () => {
        initOrDestroyPreview();
    }));

    // Initialize project on setting change
    deferDelete(Blockbench.on('update_settings', () => {
        initOrDestroyPreview();
    }));

    // Initialize project on plugin load
    initOrDestroyPreview();

}

function replaceElementMeshWithSkinnedMesh(element: OutlinerElement) {
    let oldMesh = element.mesh as THREE.Mesh;
    let parent = oldMesh.parent;
    oldMesh.removeFromParent();

    let skinnedMesh = new THREE.SkinnedMesh(oldMesh.geometry, oldMesh.material);
    Project!.nodes_3d[element.uuid] = skinnedMesh;
    parent?.add(skinnedMesh);

    // Copy properties from old mesh
    skinnedMesh.name = element.uuid;
    skinnedMesh.type = element.type;
    skinnedMesh.isElement = true;
    skinnedMesh.geometry.setAttribute('highlight', oldMesh.geometry.getAttribute('highlight'));
    skinnedMesh.outline = oldMesh.outline;
    skinnedMesh.add(skinnedMesh.outline as THREE.Object3D);
    skinnedMesh['vertex_points'] = oldMesh['vertex_points'];

    // TODO: remove
    replaceMethod(skinnedMesh, 'boneTransform', function (original, t, e) {
        // console.log(this);
        return original(t,e);
    });
    
    // Skeleton
    if (Project?.skeleton == undefined) {
        let rootBone = new THREE.Bone();
        let childBone = new THREE.Bone();
        childBone.position.x = 10;
        rootBone.add(childBone);
        Project!.skeleton = new THREE.Skeleton([ rootBone, childBone ]);
        Canvas.scene.add(Project!.skeleton!.bones[0]);
    }
    skinnedMesh.geometry.setAttribute('skinIndex', new THREE.Uint16BufferAttribute(new Array(720).fill(0).flatMap(() => [0,1,0,0]), 4));
    skinnedMesh.geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(new Array(720).fill(0).flatMap(() => [0,1,0,0]), 4));
    skinnedMesh.add(Project!.skeleton!.bones[0]);
    // Detached bind mode is used because the skeleton is not in the same group as the mesh
    skinnedMesh.bindMode = 'detached';
    skinnedMesh.bind( Project!.skeleton );
    
}

function replaceRootWithBone() {
    if (Project?.model_3d == undefined || Project.model_3d instanceof THREE.Bone)
        return;

    let oldRoot = Project.model_3d;
    let newRoot = new THREE.Bone();
    newRoot.name = oldRoot.name;

    for (let child of oldRoot.children) {
        oldRoot.remove(child);
        newRoot.add(child);
    }

    ProjectData[Project.uuid].model_3d = newRoot;
    scene.remove(oldRoot);
    scene.add(newRoot);
}

function updateSkinnedMeshAttributes(element) {
    
    let vertex = new THREE.Vector3();
    let skinWeights: number[] = [];

    for ( let i = 0; i < element.mesh.geometry.attributes.position.count; i ++ ) {
        vertex.fromBufferAttribute( element.mesh.geometry.attributes.position, i );
        let skinWeight = vertex.y / 10;
        skinWeight = Math.min(Math.max(skinWeight, 0), 1);
        skinWeights.push( 1 - skinWeight, skinWeight, 0, 0 );
    }

    element.mesh.geometry.setAttribute('skinWeight', new THREE.Float32BufferAttribute(skinWeights, 4));

}

function makeMaterialSkinned(material: THREE.ShaderMaterial) {

    material.vertexShader = skinnedVertexShader;

    // Defines
    material.defines['USE_SKINNING'] = true;
    material.defines['ANTIALIAS_BLEED_FIX'] = settings.antialiasing_bleed_fix.value || undefined;
    material.defines['MAX_BONES_JP'] = Project?.skeleton?.bones?.length ?? 0;
    // Uniforms
    material.uniforms['boneMatrices'] = { value: Project?.skeleton?.boneMatrices };

    material.needsUpdate = true;

}

function updateSkeleton() {

    if (Project?.model_3d == undefined)
        return;

    replaceRootWithBone();
    // TODO: ensure groups are bones

    // Rebuild skeleton
    let bones: THREE.Bone[] = [
        // Root bone
        Project.model_3d as THREE.Bone,
        // Group bones
        ...Project.groups.map(g => g.mesh as unknown as THREE.Bone),
    ];
    Project.skeleton = new THREE.Skeleton(bones)

    // Bind new skeleton to all meshes
    let meshElements = Project.elements.filter(e => e instanceof Mesh);
    for (let element of meshElements) {
        if (!(element.mesh instanceof THREE.SkinnedMesh))
            continue; // TODO: replace with skinnedmesh

        element.mesh.bind(Project.skeleton);
    }

    // Update materials with new bones
    let materials = meshElements
        .flatMap(e => (e.mesh as THREE.Mesh).material)
        .filterClass(THREE.ShaderMaterial)
        .unique();
    for (let material of materials)
        makeMaterialSkinned(material);

}

function initOrDestroyPreview() {
    if (Project == undefined)
        return;

    if (isVertexWeightEnabledFor(Project) && Project.skeleton == undefined) {
        initializePreview();
    } else if (isVertexWeightEnabledFor(Project) === false && Project.skeleton != undefined) {
        destroyPreview();
    }
}

function initializePreview() {

    if (Project == undefined)
        return;

    replaceRootWithBone();

    // TODO:

}

function destroyPreview() {

}
