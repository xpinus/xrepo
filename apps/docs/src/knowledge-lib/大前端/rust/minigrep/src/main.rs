use std::env;
use std::process;

use minigrep::Config;

fn main() {
    let config = Config::build(env::args()).unwrap_or_else(|error| {
        eprintln!("参数解析错误：{error}");
        process::exit(1);
    });

    println!("> Searching for {}", config.query);
    println!("> In file {} \n", config.file_path);

    if let Err(e) = minigrep::run(config) {
        eprintln!("应用错误：{e}");
        process::exit(1)
    }
}
