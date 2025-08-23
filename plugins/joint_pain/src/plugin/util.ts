import { deferRemoveElement } from "./defer";

export function isVertexWeightEnabledFor(project: ModelProject | null | undefined): boolean {
    return project?.jp_vertex_weights != undefined && project.jp_vertex_weights !== 'disabled';
}

export function addStyle(style: string) {
    deferRemoveElement(document.head.appendChild(Interface.createElement('style', { type: 'text/css' }, style)));
}

export function hexColorToVector(hexColor: string): THREE.Vector3 {
    if (hexColor.startsWith('#'))
        hexColor = hexColor.substring(1);

    let r = parseInt(hexColor.substring(0, 2), 16) / 255;
    let g = parseInt(hexColor.substring(2, 4), 16) / 255;
    let b = parseInt(hexColor.substring(4, 6), 16) / 255;
    
    return new THREE.Vector3( r, g, b );
}

export const shaderPrecisionHeader = /*glsl*/`
#ifdef GL_ES
    precision ${isApp ? 'highp' : 'mediump'} float;
#endif
`;
