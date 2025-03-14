fn main() {
    let guess = String::from("xx");
    if let Ok(guess) = guess.trim().parse::<u32>() {
        println!("The maximum is configured to be {guess}");
    } else {
        println!("请输入数字")
    }
}
