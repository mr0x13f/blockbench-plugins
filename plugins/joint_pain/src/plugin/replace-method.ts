import { defer } from './defer';

// TODO: clean this up

type MethodType = (...args: any[]) => any;

// Define a type for any constructor function (class-like objects)
type Constructor<T = any> = new (...args: any[]) => T;

// Extract method keys from the object or class prototype
type MethodKeys<T> = T extends { prototype: infer P }
    ? keyof T | keyof P  // Allows key of both the class and the prototype
    : keyof T;

// Ensure the method is of function type, considering both static and prototype methods
type FunctionType<T, K extends keyof T> =
    K extends keyof T ? (T[K] extends MethodType ? T[K] : never) :
    T extends { prototype: infer P } ? (K extends keyof P ? (P[K] extends MethodType ? P[K] : never) : never) :
    never;

export function replaceMethod<
    T extends object,
    K extends MethodKeys<T>  // key can be a key of T or T.prototype
>(
    target: T,
    key: K,
    newMethod: (
        this: T extends Constructor ? InstanceType<T> : T,
        original: FunctionType<T, K>,
        ...args: Parameters<FunctionType<T, K>>  // args are the parameters of the original method
    ) => ReturnType<FunctionType<T, K>>  // return type of the original method
) {
    // Type guard to check if target is a class constructor (i.e., has a prototype field)
    const isConstructor = typeof target === 'function' && 'prototype' in target;

    let methodOwner: any;

    if (isConstructor) {
        // Type assertion to tell TypeScript that `target` has a `prototype` field
        const targetAsConstructor = target as Constructor;

        // Check if the key exists on the prototype or class itself
        if (key in targetAsConstructor.prototype) {
            methodOwner = targetAsConstructor.prototype; // Instance method on the prototype
        } else {
            // Otherwise, treat as static method on the class itself
            methodOwner = targetAsConstructor;
        }
    } else {
        // For plain objects (not classes), handle as normal
        methodOwner = target;
    }

    const oldMethod = methodOwner[key];

    // Ensure oldMethod is a function before proceeding
    if (typeof oldMethod !== 'function') {
        throw new Error(`Method ${String(key)} is not a function`);
    }

    methodOwner[key] = function (this: any, ...args: any[]) {
        const oldMethodCall = (...bargs: any[]) => oldMethod.apply(this, bargs);

        // Ensure that `this` refers to the instance when calling `newMethod`
        return newMethod.apply(this, [oldMethodCall as FunctionType<T, K>, ...args as Parameters<FunctionType<T, K>>]);
    };

    // Optionally, defer to restore the original method
    defer(() => {
        methodOwner[key] = oldMethod;
    });
}
