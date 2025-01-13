// 我的实现：
type MyReadonly2<T, K extends keyof T = keyof T> = {
    [p in keyof T as p extends K ? never : p]: T[p];
} & {
    readonly [p in K]: T[p];
};
// 因为第二个泛型可能为空，所以需要通过 = 来赋默认值

// 用例：
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

const todo: MyReadonly2<Todo, 'title' | 'description'> = {
    title: 'Hey',
    description: 'foobar',
    completed: false,
};

todo.title = 'Hello'; // Error: cannot reassign a readonly property
todo.description = 'barFoo'; // Error: cannot reassign a readonly property
todo.completed = true; // OK
