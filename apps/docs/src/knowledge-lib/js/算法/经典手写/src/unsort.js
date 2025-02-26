const arr = [1, 2, 3, 4, 5];

function shuffle(arr) {
    for (let i = 0; i < arr.length; i++) {
        const target = Math.floor(Math.random() * i);

        [arr[i], arr[target]] = [arr[target], arr[i]];
    }

    return arr;
}

shuffle(arr);
console.log(arr);
