use rand;
use std::{cmp::Ordering, io};

/**
 * 猜测随机数
 */
fn main() {
    println!("======== 猜测随机数 ========");
    println!("> 请输入数字：");

    let target = rand::random_range(0..=100);
    // println!("目标是：{}", target);

    loop {
        let mut guess = String::new();
        io::stdin().read_line(&mut guess).expect("请输入");
        println!("你输入了：{}", guess);
        let guess = match guess.trim().parse::<u32>() {
            Ok(num) => num,
            Err(_) => {
                println!("请输入数字");
                continue;
            }
        };

        match target.cmp(&guess) {
            Ordering::Equal => {
                println!("you win");
                break;
            }
            Ordering::Greater => {
                println!("> 小了");
                continue;
            }
            Ordering::Less => {
                println!("> 大了");
                continue;
            }
        }
    }
}
