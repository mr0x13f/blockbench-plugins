let deferred: (()=>void)[] = [];

export function defer(lambda: ()=>void) {
    deferred.push(lambda);
}

export function deferDelete(deletable: Deletable) {
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

export function deferRemoveStyle(style: string) {
    deferRemoveElement(document.head.appendChild(Interface.createElement('style', { type: 'text/css' }, style)));
}
