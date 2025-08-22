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
    // Additions from this plugin
    //////////////////////////////////////////////////////////

    interface ModelProject {
        jp_vertex_weights: 'disabled'|'one'|'four'|'unlimited'|undefined;
    }

    interface Mesh {
        jp_weights: {
            [vertexId: string]: {
                [groupId: string]: number
            }
        };
    }

}
