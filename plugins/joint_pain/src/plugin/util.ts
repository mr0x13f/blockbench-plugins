import { deferRemoveElement } from "./defer";

export function isVertexWeightEnabledFor(project: ModelProject | null | undefined): boolean {
    return project?.jp_vertex_weights != undefined && project.jp_vertex_weights !== 'disabled';
}

export function addStyle(style: string) {
    deferRemoveElement(document.head.appendChild(Interface.createElement('style', { type: 'text/css' }, style)));
}

export const shaderPrecisionHeader = /*glsl*/`
#ifdef GL_ES
    precision ${isApp ? 'highp' : 'mediump'} float;
#endif
`;
