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