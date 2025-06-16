export {};

declare global {
    interface Array<T> {
        unique(): T[];
        filterClass<U extends T>(constructor: new (...args: any[]) => U): U[];
        toSet(): Set<T>;
        toRecord<K extends string|number|symbol, V>(this: [K, V][]): Record<K, V>;
    }
}

Array.prototype.toRecord = function <K extends string|number|symbol, V>(): Record<K, V> {
    let record: Record<K, V> = {} as Record<K, V>;
    for (let [key, value] of this as [K, V][])
        record[key] = value;
    return record;
};

Array.prototype.toSet = function <T>(): Set<T> {
    return new Set(this);
};

Array.prototype.unique = function <T>(): T[] {
    return Array.from(this.toSet());
};

Array.prototype.filterClass = function <T, U extends T>(
    constructor: new (...args: any[]) => U
): U[] {
    return this.filter(x => x instanceof constructor);
};
