fn main() {
    let vec = vec![1, 2, 3, 4, 5];
    let filtered_vec: Vec<i32> = vec.into_iter().filter(|&x| x % 2 == 0).collect();

    println!("{:?}", filtered_vec)
}
