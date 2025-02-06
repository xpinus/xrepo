// 我的实现：
type Diff<T, U> =  Omit<T & U, keyof (T | U)>

// 用例：
type Foo = {
  a: string;
  b: number;
}
type Bar = {
  a: string;
  c: boolean
}

type Result1 = Diff<Foo,Bar> // { b: number, c: boolean }
type Result2 = Diff<Bar,Foo> // { b: number, c: boolean }

