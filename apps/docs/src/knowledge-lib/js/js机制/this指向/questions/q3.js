var obj = {
    name: 'obj',
    sayName: () => {
        console.log('say: ' + this.name);
    },
};

console.log(obj.name);
obj.sayName();

var fn = obj.sayName;
fn();

var obj2 = {
    name: 'obj',
    sayName: function () {
        console.log('say: ' + this.name);
    },
};

obj2.sayName();

var fn2 = obj2.sayName;
fn2();
