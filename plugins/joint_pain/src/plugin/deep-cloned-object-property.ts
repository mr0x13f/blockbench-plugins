// Fix for Properties of type 'object' not getting read properly on project load
// Thanks SnaveSutit!
export class DeepClonedObjectProperty extends Property<'object'> {
    constructor(targetClass: any, name: string, options?: PropertyOptions | undefined) {
        super(targetClass, 'object', name, options)
    }
    merge(instance: any, data: any) {
        if (data[this.name] == undefined) {
            instance[this.name] = undefined;
        } else if (typeof data[this.name] === 'object') {
            instance[this.name] = JSON.parse(JSON.stringify(data[this.name]));
            (JSON.stringify(instance[this.name]));

            // Empty object gets replaced with undefined
            if (Object.keys(instance[this.name]).length === 0)
                instance[this.name] = undefined;
        }
    }
    copy(instance: any, target: any) {
        if (instance[this.name] == undefined) {
            target[this.name] = undefined;
        } else if (typeof instance[this.name] === 'object') {
            target[this.name] = JSON.parse(JSON.stringify(instance[this.name]));

            // Empty object gets replaced with undefined
            if (Object.keys(target[this.name]).length === 0)
                target[this.name] = undefined;
        }
    }
}
