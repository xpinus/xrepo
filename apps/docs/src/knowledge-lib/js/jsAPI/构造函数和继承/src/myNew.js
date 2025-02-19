function myNew(constructor, ...args) {
    const obj = Object.create(constructor.prototype);

    const result = constructor.apply(obj, args);

    return result instanceof Object ? result : obj;
}

function Person(name) {
    this.name = name;
}
Person.prototype.say = function () {
    console.log('my name is ' + this.name);
};

const p = myNew(Person, '李四');
p.say();
