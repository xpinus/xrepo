---
sort: 3
---

# JavaScript 原型，原型链 ? 有什么特点？

**自己的解读**

- 在 js 创立的时候，是秉持着流行的万物皆对象的思想，但只是想创建一门简单的语言，不想实现类和继承这样 C++、java 等语言复杂的机制，但又需要这种功能。

- 在实现的时候不像 C++等语言`new 类`，然后调用”类“对应的”构造函数“，js 是`new 构造函数(constructor)`。但用构造函数生成实例对象，有一个缺点，就是无法共享属性和方法。因此创建了`prototype`属性对象（显示原型）。
- 当实例创建的时候，会自动引入`prototype`对象，使得实例可以使用引用的方法，引入的方式就是实例有一个私有属性`__proto__`，即`__proto__`===`constructor.prototype`
  - 但是通过` Object.create()`创建的一个新对象，使用现有的对象（原材料）来提供新创建的对象的`__proto__`。
- `__proto__`这个私有属性是每个对象都有的，又因为它的指向，因此可以实现原型链的效果

## 原型

- `prototype（显式原型）`

  - <span style="color: red;">每一个函数（仅限函数）在创建之后都会拥有一个名为 prototype 的属性，这个属性指向函数的原型对象。</span>
  - 作用：用于放某同一类型实例的共享属性和方法，**不会反复开辟存储空间，减少内存浪费**，
    - 这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。
    - 原型对象也有一个属性，叫做 constructor，这个属性包含了一个指针，指回原构造函数。
  - 原型中 this 指向实例化对象
  - **Note**：通过`Function.prototype.bind`方法构造出来的函数是个例外，它没有 prototype 属性。

- `[__proto__]（隐式原型）`:

  - `JavaScript`的所有对象中都包含了一个 `__proto__` 内部属性，所有引用类型都有，指向构造函数的显示原型

  - <img src="https://img-blog.csdnimg.cn/20190309181753763.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3g1NTAzOTIyMzY=,size_16,color_FFFFFF,t_70" alt="img" style="zoom:50%;" />

  - 在 ES5 之前没有标准的方法访问这个内置属性，但是大多数浏览器都支持通过`__proto__`来访问。ES6 中有了对于这个内置属性标准的方法:

    - ```js
      Object.setPrototypeOf(); // (写)
      Object.getPrototypeOf(); // (读)
      Object.create(); // (生成。创建)
      ```

  - 作用：构成原型链，同样用于实现基于原型的继承。举个例子，当我们访问 obj 这个对象中的 x 属性时，如果在 obj 中找不到，那么就会沿着`__proto__`依次查找

  - **Note**: `Object.prototype` 这个对象是个例外，它的`__proto__`值为 null

- `constructor`：

  - <span style="color: red;">所有的 prototype 和 实例化对象 都有一个 constructor 属性，都指向关联的构造函数本身</span>
  - 所以**constructor 属性其实就是一个拿来保存自己构造函数引用的属性**，没有其他特殊的地方。

```js
function Person() {}
var person1 = new Person();
var person2 = new Person();

console.log(person1.constructor === Person); // true
console.log(Person.constructor === Function); // true
console.log(Function.constructor === Function); // true
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019052116033342.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3g1NTAzOTIyMzY=,size_16,color_FFFFFF,t_70)

当我们声明一个 function 关键字的方法时，会为这个方法添加一个 prototype 属性，指向默认的原型对象，并且此 prototype 的 constructor 属性也指向方法对象。此二个属性会在创建对象时被对象的属性引用。

```js
function Hello() {} // 构造函数
var h = new Hello(); // 实例化对象

// 所有函数都有个prototype属性（显式原型）
console.log(Hello.prototype); // Object {}  原型对象
// 构造函数的prototype属性有个constructor属性，指向构造函数本身
console.log(Hello.prototype.constructor === Hello); // true
// 实例化对象没有prototype属性、只有函数才有prototype属性
console.log(h.prototype); // undefined

// 实例化对象的constructor属性指向构造函数本身
console.log(h.constructor === Hello); // true
// 即
console.log(h.constructor === Hello.prototype.constructor); // true

// 所有引用类型都拥有__proto__属性（隐式原型）
console.log(h.__proto__ === Hello.prototype); // true
// 即
console.log(h.__proto__ === h.constructor.prototype); //true
// 即
console.log(Hello.prototype === h.constructor.prototype); //true
// 即
console.log(Hello === h.constructor); // true
```

- 二者的关系：隐式原型指向**创建**这个对象的 constructor 的显式原型

  - `obj.__proto__ === obj.constructor.prototype`

- 原型是一个对象，其他对象可以通过它实现属性继承
- JavaScript 的函数对象，除了原型 `[__proto__]` 之外，还预置了 `prototype` 属性
- 当函数对象作为构造函数创建实例时，该 `prototype（显式原型）`属性值将被作为实例对象的原型 `[__proto__]`。
- 大多数情况下，`__proto__`可以理解为“构造器的原型”,但是通过 `Object.create()`创建的对象有可能不是， `Object.create()`方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`

## 原型链

- 当一个对象调用的属性/方法自身不存在时，就会去自己 `[__proto__]` 关联的前辈 `prototype` 对象上去找
- 如果没找到，就会去该 `prototype` 原型 `[__proto__]` 关联的前辈 `prototype` 去找。依次类推，直到找到属性/方法或 `undefined` 为止。从而形成了所谓的“原型链”

![在这里插入图片描述](https://img-blog.csdnimg.cn/94300021f9424ee185a5f70ba9f604ad.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3g1NTAzOTIyMzY=,size_16,color_FFFFFF,t_70#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/0c47393c73724a9f8774ed29820982ed.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3g1NTAzOTIyMzY=,size_16,color_FFFFFF,t_70#pic_center)
