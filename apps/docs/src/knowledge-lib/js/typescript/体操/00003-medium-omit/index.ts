// 我的实现：
type MyOmit<T, K extends keyof T> = {
    [P in keyof T as P extends K ? never : P]: T[P];
};

// 使用Exclude实现
// type MyOmit<T, K extends keyof T> = {
//     [P in Exclude<keyof T, K>]: T[P]
// }

// 用例：
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type TodoPreview = MyOmit<Todo, 'description' | 'title'>;

const todo: TodoPreview = {
    completed: false,
};
