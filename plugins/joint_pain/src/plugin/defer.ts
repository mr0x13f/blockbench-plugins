let deferred: (()=>void)[] = [];

export function defer(lambda: ()=>void) {
    deferred.push(lambda);
}

export function deferDelete<T extends Deletable>(deletable: T): T {
    defer(() => deletable.delete());
    return deletable;
}

export function runDeferred() {
    for (let lambda of deferred.reverse())
        lambda();
}

export function deferRemoveElement(element: HTMLElement): HTMLElement {
    defer(() => element.parentElement?.removeChild(element));
    return element;
}
