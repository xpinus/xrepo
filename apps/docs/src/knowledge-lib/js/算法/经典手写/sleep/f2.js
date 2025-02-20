function sleep(time) {
    let now = Date.now();
    while (Date.now() - now < time) {}
}

console.log(1);
sleep(1000);
console.log(2);
