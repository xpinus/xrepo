// 实现：
type MyReadonly<T> = {
    readonly [key in keyof T]: T[key];
};

// 用例：
interface Todo {
    title: string
    description: string
}

const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar"
}

todo.title = "Hello" // Error: cannot reassign a readonly property
todo.description = "barFoo" // Error: cannot reassign a readonly property
