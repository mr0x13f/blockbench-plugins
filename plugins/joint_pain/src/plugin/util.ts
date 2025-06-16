export function isVertexWeightEnabledFor(project: ModelProject | null | undefined): boolean {
    return project?.jp_vertex_weights != undefined && project.jp_vertex_weights !== 'disabled';
}
