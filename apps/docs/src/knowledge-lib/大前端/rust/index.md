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

```shell
rustup update stable  # 更新版本 
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

[vscode开发环境推荐](https://www.duidaima.com/Group/Topic/Rust/18060)

## 基本概念
[菜鸟教程](https://www.runoob.com/rust/rust-iter.html)

### 输出到命令行
```rust
// println 不是一个函数，而是一个宏规则。
println!("hello world"); // 追加换行符
print!("hello world");

let a = 1;
println!("hello {}", a); // {} 占位符
println!("hello {0}，yes {0}", a); // 把之后的可变参数当作一个数组来访问
println!("hello {{}}", a); // {{ 和 }} 转义


let vec = vec![1, 2, 3, 4, 5];
println!("{:?}", vec)  // 把一个数组格式化后打印
```
### 变量
```rust
let a = 123;       // 不可变变量
let a = 456;       // 不可变变量, 可以重新绑定

let mut b = 10;  // 可变变量
b = 20;          // 可变变量，可以重新赋值

const c: i32 = 123; // 常量
```
### 数据类型
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

> 元组和数组的异同？

元组（tuple）和数组（array）都是复合数据类型
相同点：
- 长度固定：，长度是类型的一部分
- 内存布局：元素在内存中顺序排列
不同点：
- 元素类型：元组，可以包含不同类型的元素；数组，所有元素必须是同一类型
- 访问方式：元组：使用点号加索引（如 t.0）访问元素。数组：使用方括号加索引（如 a[0]）访问元素。

### 语句
- `if else`  条件必须是bool，不是bool的话需要转换，虽然 C/C++ 语言中的条件表达式用整数表示，非 0 即真，但这个规则在很多注重代码安全性的语言中是被禁止的
- 循环 
  - while : Rust 语言到此教程编撰之日还没有 do-while 的用法，但是 do 被规定为保留字，也许以后的版本中会用到
  - for in : 没有使用三元语句控制循环的for
  - loop : 无限循环
  
### 迭代器

Rust 中的迭代器（Iterator）是一个强大且灵活的工具，用于对集合（如数组、向量、链表等）进行逐步访问和操作。迭代器背后的核心思想是**将数据处理过程与数据本身分离**，使代码更清晰、更易读、更易维护。

1. 创建

最常见的方式是通过集合的 .iter()、.iter_mut() 或 .into_iter() 方法来创建迭代器：
- .iter()：返回集合的不可变引用迭代器。
- .iter_mut()：返回集合的可变引用迭代器。
- .into_iter()：将集合转移所有权并生成值迭代器。

2. 方法（适配器）

一般方法：
- map()：对每个元素应用某个函数，并返回一个新的迭代器。
- filter()：过滤出满足条件的元素。
- take(n)：只返回前 n 个元素的迭代器。
- skip(n)：跳过前 n 个元素，返回剩下的元素迭代器。

消耗型方法：使用迭代器直到它被完全消耗，此时才会真正处理数据
- collect()：将迭代器转换为集合（如向量、哈希集）。
- sum()：计算迭代器中所有元素的和。
- product()：计算迭代器中所有元素的乘积。
- count()：返回迭代器中元素的个数。

### 闭包

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

### 所有权：

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

结构体（Struct）与元组（Tuple）都可以将若干个类型不一定相同的数据捆绑在一起形成整体，但结构体的每个成员和其本身都有一个名字，这样访问它成员的时候就不用记住下标了。

元组常用于非定义的多值传递，而结构体用于规范常用的数据结构。

结构体必须掌握字段值所有权，因为结构体失效的时候会释放所有字段


```rust
#[derive(Debug)]

// 定义一个结构体
struct Site {
    domain: String,
    name: String,
    nation: String,
    found: u32
}

println!("rect1 is {:?}", rect1);   // 导入调试库 #[derive(Debug)] ，就可以用 {:?} 占位符输出一整个结构体

// 实现
let runoob = Site {
    domain: String::from("www.runoob.com"),
    name: String::from("RUNOOB"),
    nation: String::from("China"),
    found: 2013
};


// 元组结构体
struct Color(u8, u8, u8);

let black = Color(0, 0, 0);

println!("black = ({}, {}, {})", black.0, black.1, black.2);
```

rust不是面向对象的，为了实现类似类的方案，采用了impl 

定义结构体方法（类似类内方法）、函数（类似类静态函数的概念）

结构体 impl 块可以写几次，效果相当于它们内容的拼接！

> 枚举类
结构体（Struct）与元组（Tuple）都可以将若干个类型不一定相同的数据捆绑在一起形成整体，但结构体的每个成员和其本身都有一个名字，这样访问它成员的时候就不用记住下标了。

元组常用于非定义的多值传递，而结构体用于规范常用的数据结构。

结构体必须掌握字段值所有权，因为结构体失效的时候会释放所有字段


```rust
#[derive(Debug)]

// 定义一个结构体
struct Site {
    domain: String,
    name: String,
    nation: String,
    found: u32
}

println!("rect1 is {:?}", rect1);   // 导入调试库 #[derive(Debug)] ，就可以用 {:?} 占位符输出一整个结构体

// 实现
let runoob = Site {
    domain: String::from("www.runoob.com"),
    name: String::from("RUNOOB"),
    nation: String::from("China"),
    found: 2013
};


// 元组结构体
struct Color(u8, u8, u8);

let black = Color(0, 0, 0);

println!("black = ({}, {}, {})", black.0, black.1, black.2);
```

rust不是面向对象的，为了实现类似类的方案，采用了impl 

定义结构体方法（类似类内方法）、函数（类似类静态函数的概念）

结构体 impl 块可以写几次，效果相当于它们内容的拼接！

> 枚举类
结构体（Struct）与元组（Tuple）都可以将若干个类型不一定相同的数据捆绑在一起形成整体，但结构体的每个成员和其本身都有一个名字，这样访问它成员的时候就不用记住下标了。

元组常用于非定义的多值传递，而结构体用于规范常用的数据结构。

结构体必须掌握字段值所有权，因为结构体失效的时候会释放所有字段


```rust
#[derive(Debug)]

// 定义一个结构体
struct Site {
    domain: String,
    name: String,
    nation: String,
    found: u32
}

println!("rect1 is {:?}", rect1);   // 导入调试库 #[derive(Debug)] ，就可以用 {:?} 占位符输出一整个结构体

// 实现
let runoob = Site {
    domain: String::from("www.runoob.com"),
    name: String::from("RUNOOB"),
    nation: String::from("China"),
    found: 2013
};


// 元组结构体
struct Color(u8, u8, u8);

let black = Color(0, 0, 0);

println!("black = ({}, {}, {})", black.0, black.1, black.2);
```

rust不是面向对象的，为了实现类似类的方案，采用了impl 

定义结构体方法（类似类内方法）、函数（类似类静态函数的概念）

结构体 impl 块可以写几次，效果相当于它们内容的拼接！

> 枚举类
