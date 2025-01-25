
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

## 00015-最后一个元素

实现一个`Last<T>`泛型，它接受一个数组T并返回其最后一个元素的类型。

<<< ./src/00015-last.ts

## 00016-排除最后一项

实现一个泛型`Pop<T>`，它接受一个数组T，并返回一个由数组T的前 N-1 项（N 为数组T的长度）以相同的顺序组成的数组。

<<< ./src/00016-pop.ts

## 00018-获取元组长度

创建一个`Length`泛型，这个泛型接受一个只读的元组，返回这个元组的长度。

<<< ./src/00018-length.ts

## 00020-Promise.all

给函数PromiseAll指定类型，它接受元素为 Promise 或者类似 Promise 的对象的数组，返回值应为Promise<T>，其中T是这些 Promise 的结果组成的数组。

<<< ./src/00020-promise-all.ts

## 00043-Exclude

实现内置的 Exclude<T, U> 类型，但不能直接使用它本身。

> 从联合类型 T 中排除 U 中的类型，来构造一个新的类型。

## 00062-查找类型

有时，您可能希望根据某个属性在联合类型中查找类型。

在此挑战中，我们想通过在联合类型`Cat | Dog`中通过指定公共属性type的值来获取相应的类型。换句话说，在以下示例中，`LookUp<Dog | Cat, 'dog'>`的结果应该是`Dog`，`LookUp<Dog | Cat, 'cat'>`的结果应该是Cat。

<<< ./src/00062-medium-type-lookup.ts

## 00106-去除左侧空白

实现 `TrimLeft<T>` ，它接收确定的字符串类型并返回一个新的字符串，其中新返回的字符串删除了原字符串开头的空白字符串。

<<< ./src/00106-medium-trimleft.ts

## 00108-去除两端空白字符

实现`Trim<T>`，它接受一个明确的字符串类型，并返回一个新字符串，其中两端的空白符都已被删除。

<<< ./src/00108-medium-trim.

## 00110-Capitalize

实现 `Capitalize<T>` 它将字符串的第一个字母转换为大写，其余字母保持原样。

<<< ./src/00110-medium-capitalize.ts

## 00116-Replace

实现 `Replace<S, From, To>` 将字符串 S 中的第一个子字符串 From 替换为 To 。

<<< ./src/00116-medium-replace.ts

## 00119-ReplaceAll

实现 `ReplaceAll<S, From, To>` 将一个字符串 S 中的所有子字符串 From 替换为 To。

<<< ./src/00119-medium-replaceAll.ts

## 00189-Awaited

假如我们有一个 Promise 对象，这个 Promise 对象会返回一个类型。在 TS 中，我们用 Promise 中的 T 来描述这个 Promise 返回的类型。请你实现一个类型，可以获取这个类型。

例如：`Promise<ExampleType>`，请你返回 `ExampleType` 类型。

<<< ./src/00189-awaited.ts

## 00191-追加参数

实现一个泛型 `AppendArgument<Fn, A>`，对于给定的函数类型 Fn，以及一个任意类型 A，返回一个新的函数 G。G 拥有 Fn 的所有参数并在末尾追加类型为 A 的参数。

<<< ./src/00191-medium-append-argument.ts

## 00268-If

实现一个 IF 类型，它接收一个条件类型 C ，一个判断为真时的返回类型 T ，以及一个判断为假时的返回类型 F。 C 只能是 true 或者 false， T 和 F 可以是任意类型。

<<< ./src/00268-if.ts

## 00296-Permutation

实现联合类型的全排列，将联合类型转换成所有可能的全排列数组的联合类型。

<<< ./src/00296-medium-permutation.ts

## 00298-字符串的长度

计算字符串的长度，类似于 String#length 。

<<< ./src/00298-length-of-string.ts

## 00459-Flatten

在这个挑战中，你需要写一个接受数组的类型，并且返回扁平化的数组类型。

<<< ./src/00459-flatten.ts

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