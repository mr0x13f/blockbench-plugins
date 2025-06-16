import 'blockbench-types';
import * as THREE_ from 'three';

declare global {
    
    //////////////////////////////////////////////////////////
    // Fix THREE
    //////////////////////////////////////////////////////////

    declare namespace THREE {
        export type * from 'three';
    }

    const THREE: typeof THREE_;

    //////////////////////////////////////////////////////////
    // Non-Typescript imports
    //////////////////////////////////////////////////////////

    declare module '*.vue' {
        import Vue from 'vue';
        export default Vue;
    }

    declare module '*.glsl' {
        const value: string;
        export default value;
    }

    declare module '*.py' {
        const value: string;
        export default value;
    }

    declare module '*.css' {
        const value: string;
        export default value;
    }

    //////////////////////////////////////////////////////////
    // Missing types
    //////////////////////////////////////////////////////////

    // TODO: move this to patch file
    declare const ProjectData: Record<string, {
        model_3d: THREE.Object3D,
        nodes_3d: Record<string, THREE.Object3D>,
    }>;

    interface PropertyOptions {
        description?: string,
    }

    //////////////////////////////////////////////////////////
    // Additions from this plugin
    //////////////////////////////////////////////////////////

    interface ModelProject {
        skeleton: THREE.Skeleton|undefined;
        jp_vertex_weights: 'disabled'|'one'|'four'|undefined;
    }

}
