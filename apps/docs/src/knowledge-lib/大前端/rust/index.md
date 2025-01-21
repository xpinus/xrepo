# Rust

```text
Rustup metadata and toolchains will be installed into the Rustup
home directory, located at:

C:\Users\pinus\.rustup

This can be modified with the RUSTUP_HOME environment variable.

The Cargo home directory is located at:

C:\Users\pinus\.cargo

This can be modified with the CARGO_HOME environment variable.

The cargo, rustc, rustup and other commands will be added to
Cargo's bin directory, located at:

C:\Users\pinus\.cargo\bin

This path will then be added to your PATH environment variable by
modifying the HKEY_CURRENT_USER/Environment/PATH registry key.

You can uninstall at any time with rustup self uninstall and
these changes will be reverted.
```

> rust安装成功  `rustc --veersion`
> rust本地文档  `rustup doc`
> 创建项目
- cargo new hello-rust
- cargo build
- cargo run

## Cargo
> Rust的构建工具和包管理器

Cargo.toml是[Cargo manifest](https://doc.rust-lang.org/cargo/reference/manifest.html)文件

## 基础
> 输出到命令行
```rust
// println 不是一个函数，而是一个宏规则。
println!("hello world"); // 追加换行符
print!("hello world");

let a = 1;
println!("hello {}", a); // {} 占位符
println!("hello {0}，yes {0}", a); // 把之后的可变参数当作一个数组来访问
println!("hello {{}}", a); // {{ 和 }} 转义
```
> 变量

```rust
let a = 123;       // 不可变变量
let a = 456;       // 不可变变量, 可以重新绑定

let mut b = 10;  // 可变变量
b = 20;          // 可变变量，可以重新赋值

const c: i32 = 123; // 常量
```
> 数据类型
- 基本数据类型
  - 整数型，分为有符号i和无符号u的 8、16、32、64、128、arch（处理器长度）
    - 十进制（98_222）、十六机制（0xff）、8进制（0o77）、二进制（0b1111_0000）、字节u8（b'A'）
  - 浮点数型：f32、f64
  - 布尔型：bool
  - 字符型：char (大小为4字节，代表 Unicode标量值)
  - 仅包含以上类型的元组
- 复合类型 
  - 元组是用一对 `( )` 包括的一组数据，可以包含不同种类的数据
  - 数组 `[]`
- 函数 fn <函数名> ( <参数> ) { 函数体 }
> 语句
- `if else`  条件必须是bool，不是bool的话需要转换，虽然 C/C++ 语言中的条件表达式用整数表示，非 0 即真，但这个规则在很多注重代码安全性的语言中是被禁止的
- 循环 
  - while : Rust 语言到此教程编撰之日还没有 do-while 的用法，但是 do 被规定为保留字，也许以后的版本中会用到
  - for in : 没有使用三元语句控制循环的for
  - loop : 无限循环
> 迭代器

Rust 中的迭代器（Iterator）是一个强大且灵活的工具，用于对集合（如数组、向量、链表等）进行逐步访问和操作。

Rust 的迭代器是惰性求值的，这意味着迭代器本身不会立即执行操作，而是在你需要时才会产生值。

迭代器允许你以一种声明式的方式来遍历序列，如数组、切片、链表等集合类型的元素。

迭代器背后的核心思想是**将数据处理过程与数据本身分离**，使代码更清晰、更易读、更易维护。

> 闭包

```let closure_name = |参数列表| 表达式或语句块;```

闭包可以通过 move 关键字获取外部变量的所有权，或者通过借用的方式获取外部变量的引用。

闭包在 Rust 中是一种特殊的类型，称为 Fn、FnMut 或 FnOnce，它们分别表示不同的闭包特性：

Fn：闭包不可变地借用其环境中的变量。
FnMut：闭包可变地借用其环境中的变量。
FnOnce：闭包获取其环境中的变量的所有权，只能被调用一次。

```rust 
// 定义一个函数，接受一个闭包作为参数，将闭包应用到给定的数字上
fn apply_operation<F>(num: i32, operation: F) -> i32
where
    F: Fn(i32) -> i32,
{
    operation(num) // Rust 函数的最后一个表达式的值会作为函数的返回值
}

// 主函数
fn main() {
    // 定义一个数字
    let num = 5;

    // 定义一个闭包，用于对数字进行平方运算
    let square = |x| x * x;

    // 调用函数，并传入闭包作为参数，对数字进行平方运算
    let result = apply_operation(num, square);

    // 输出结果
    println!("Square of {} is {}", num, result);
}
```

> 所有权：

所有权概念是为了让 Rust 在编译阶段更有效地分析内存资源的有用性以实现内存管理而诞生的概念
- Rust 中的每个值都有一个变量，称为其所有者。
- 一次只能有一个所有者。
- 当所有者不在程序运行范围时，该值将被删除。

移动（Move）：
- 仅在栈中的数据的"移动"方式是直接复制
- 只有栈中的数据被复制了，堆中的字符串依然还是原来的字符串，原先的指向会失效，以保证堆中的数据不会被释放两次
```rust
let s1 = String::from("hello");
let s2 = s1; 
println!("{}, world!", s1); // 错误！s1 已经失效
```
- 如果将变量当作参数传入函数，那么它和移动的效果是一样的
- 被当作函数返回值的变量所有权将会被移动出函数并返回到调用函数的地方，而不会直接被无效释放

和克隆（Clone）:
- 一旦克隆（Clone），就会在堆中创建一个新的数据，原来的数据依然有效，但指向被复制了
```rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1.clone();
    println!("s1 = {}, s2 = {}", s1, s2);
}
```

`引用`不会获得值的所有权,可以把它看作一种指针
```text
fn main() {
    let s1 = String::from("hello");
    let s2 = &s1;
    println!("s1 is {}, s2 is {}", s1, s2);
}
```

> 切片

切片（Slice）是对数据值的部分`引用`, 因此是只读的

```rust
fn main() {
    let mut s = String::from("runoob");
    let slice = &s[0..3];  
    s.push_str("yes!"); // 错误 
    println!("slice = {}", slice);
}
```

> 结构体

