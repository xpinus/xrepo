
# TypeScript 类型体操

[TypeScript 类型体操姿势合集](https://github.com/type-challenges/type-challenges/blob/main/README.zh-CN.md)

## 00002-获取函数返回类型

不使用 ReturnType 实现 TypeScript 的 `ReturnType<T>` 泛型

<<< ./src/00002-returntype.ts

## 00003-Omit

不使用 Omit 实现 TypeScript 的 `Omit<T, K>` 泛型。Omit 会创建一个省略 K 中字段的 T 对象。

<<< ./src/00003-omit.ts

## 00004-Pick

`Pick<T, K>` 从类型 T 中选出符合 K 的属性，构造一个新的类型

<<< ./src/00004-pick.ts

## 00007-只读

泛型 `Readonly<T>` 会接收一个 泛型参数，并返回一个完全一样的类型，只是所有属性都会是只读 (readonly) 的

<<< ./src/00007-n-readonly.ts

## 00008-指定类型只读

实现一个泛型`MyReadonly2<T, K>`，它带有两种类型的参数T和K。

类型 K 指定 T 中要被设置为只读 (readonly) 的属性。如果未提供K，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

<<< ./src/00008-readonly.ts

## 00009-深度只读

实现一个泛型 `DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。不考虑数组、函数、类等。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

<<< ./src/00009-deep-readonly.ts

## 00010-元组转合集

实现泛型`TupleToUnion<T>`，它返回元组所有值的合集

<<< ./src/00010-medium-tuple-to-union.ts 

## 00011-元组转换对象

将一个元组类型转换为对象类型，这个对象类型的键/值和元组中的元素对应

<<< ./src/00011-tuple-to-object.ts

## 00012-可串联构造器

在 JavaScript 中我们经常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 TypeScript 中，你能合理的给它赋上类型吗？

在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - Interface, Type 或 Class 都行。你需要提供两个函数 option(key, value) 和 get()。在 option 中你需要使用提供的 key 和 value 扩展当前的对象类型，通过 get 获取最终结果。

<<< ./src/00012-medium-chainable-options.ts

## 00014-第一个元素类型

实现一个`First<T>`泛型，它接受一个数组T并返回它的第一个元素的类型

<<< ./src/00014-first.ts

## 00018-获取元组长度

创建一个`Length`泛型，这个泛型接受一个只读的元组，返回这个元组的长度。

<<< ./src/00018-length.ts

## 00043-Exclude

实现内置的 Exclude<T, U> 类型，但不能直接使用它本身。

> 从联合类型 T 中排除 U 中的类型，来构造一个新的类型。

<<< ./src/00043-exculde.ts

## 00189-Awaited

假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。

例如：`Promise<ExampleType>`，请你返回 `ExampleType` 类型。

<<< ./src/00189-awaited.ts

## 00268-If

实现一个 IF 类型，它接收一个条件类型 C ，一个判断为真时的返回类型 T ，以及一个判断为假时的返回类型 F。 C 只能是 true 或者 false， T 和 F 可以是任意类型。

<<< ./src/00268-if.ts

## 00533-Concat

在类型系统里实现 JavaScript 内置的 Array.concat 方法，这个类型接受两个参数，返回的新数组类型应该按照输入参数从左到右的顺序合并为一个新的数组。

<<< ./src/00533-concat.ts

## 00898-Includes

在类型系统里实现 JavaScript 的 Array.includes 方法，这个类型接受两个参数，返回的类型要么是 true 要么是 false。

<<< ./src/00898-includes.ts

## 03057-push

在类型系统里实现通用的 Array.push

<<< ./src/03057-push.ts

> why use unknow insteadof any
> The unknown type represents any value. This is similar to the any type, but is safer because it’s not legal to do anything with an unknown value: https://www.typescriptlang.org/docs/handbook/2/functions.html#unknown

## 03060-Unshift

实现类型版本的 Array.unshift

<<< ./src/03060-easy-unshift.ts

## 03312-Parameters

实现内置的`Parameters`类型

<<< ./src/03312-easy-parameters.ts