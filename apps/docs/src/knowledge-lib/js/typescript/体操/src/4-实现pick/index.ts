// 实现：
type MyPick<T, K extends keyof T> = {
    [key in K]: T[key];
};

// 用例：
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}
type TodoPreview = MyPick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
};
