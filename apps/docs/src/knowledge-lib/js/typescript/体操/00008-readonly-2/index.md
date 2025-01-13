# 对象部分属性只读

实现一个泛型MyReadonly2<T, K>，它带有两种类型的参数T和K。

类型 K 指定 T 中要被设置为只读 (readonly) 的属性。如果未提供K，则应使所有属性都变为只读，就像普通的Readonly<T>一样。

<<< ./index.ts

