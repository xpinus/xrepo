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

配置文档：https://doc.rust-lang.org/cargo/reference/config.html


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


[The Rust Programming Language](https://doc.rust-lang.org/book/)

## Rust和WebAssembly

[Rust和WebAssembly](https://wasm.rust-lang.net.cn/docs/book/introduction.html)

[`wasm-bindgen` 指南](https://wasm.rust-lang.net.cn/docs/wasm-bindgen/introduction.html)

```shell
cargo install wasm-pack
cargo install wasm-bindgen-cli --version 0.2.87  # 保证保本和Cargo.toml中的wasm-bindgen版本一致
```

```text
[package.metadata.wasm-pack.profile.release]
wasm-opt = false
```

