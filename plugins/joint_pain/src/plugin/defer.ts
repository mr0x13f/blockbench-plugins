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
