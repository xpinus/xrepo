# Typescript概念辨析
> 一个强类型的JavaScript超集,帮助开发者在早期发现错误


## any和unknow的区别
> 都是顶级类型，所谓顶级类型可以理解为泛型父类型，即可以包含所有值的类型

**any**
- 理解为我不关心它的类型
- 可以随意使用，不会进行类型检查
- type A = keyof any;  // string | number | symbol

**unknown**
- 理解为我不知道它的类型
- 会有类型检查限制
- unknown 类型的变量只能赋给 any 类型和 unknown 类型本身（可以浅显的理解为any要比unkonw更顶级一点）
- type B = keyof unknown;  // never

在工作中，为了保证类型安全，我们应该尽可能使用 unknown 类型

## type和interface

https://blog.csdn.net/weixin_42232325/article/details/123994867

## never的妙用

表示不存在

```ts
// type Method = 'get' | 'post'
type Method = 'get' | 'post' | 'put'  // 当新增情况时

function request(method: Method) {
  if (method === 'get') {
      return method;
  } else if(method === 'post') {
    return method;
  }else {
    const neverMethod: never = method;   // ts报错，从而提示你这里需要新增分支
  }
}
```

## TypeScript 中的泛型是什么？举个例子

TypeScript 中的泛型允许您创建可与各种类型一起使用的可重用组件或函数。它们支持强类型，同时保持使用不同数据类型的灵活性。
```ts
function identity<T>(arg: T): T {
  return arg;
}
const result1 = identity<number>(42); // Explicitly specifying the type
const result2 = identity('hello'); // Inferring the type
```

## 导入namespace
命名空间（Namespace）用于组织代码，避免全局作用域中的命名冲突
```ts
// 定义一个命名空间 MyNamespace.ts
export namespace MyNamespace {
  export type MyType = {
    name: string;
    age: number;
  };
}
```

```ts
// 从命名空间导入类型
import type { MyNamespace } from './MyNamespace';

const person: MyNamespace.MyType = {
  name: 'Alice',
  age: 30,
};
```

## 重载

ts提供编译时态的重载

- 情形一
```ts

function add(a: number, b: number): number;
function add(object): number;

// ts只提供编译时态的重载，不是运行时，具体实现还是要考虑各种情况
function add(params1: number | object, params2?: number) {
    if(typeof params1 === 'number' && typeof params2 === 'number') {
        return params1 + params2
    }else {
        return params1.a + params1.b
    }
}

```

- 情形2
```ts
interface showMessage {
  (msg: string): void;
  (msg: string, onClose?: Function): void;
}
```

## 读取类实例的对象

```ts

class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

type PersonFields = keyof InstanceType<typeof Person>;
```

从 TS 的 useDefineForClassFields 选项到class-fields 提案
https://zhuanlan.zhihu.com/p/258906525