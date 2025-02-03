// 我的实现：
type AppendToObject<T, K extends keyof any, V> = {
    [prop in keyof T | K]: prop extends keyof T ? T[prop] : V
}

// 用例：
type Test = { id: '1' }
type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }