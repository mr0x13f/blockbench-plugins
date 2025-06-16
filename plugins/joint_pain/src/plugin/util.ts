export function isVertexWeightEnabledFor(project: ModelProject | null | undefined): boolean {
    return project?.vertex_weights != undefined && project.vertex_weights !== 'disabled';
}
