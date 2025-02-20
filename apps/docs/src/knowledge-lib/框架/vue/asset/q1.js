const arr = [1, 2, 3, 4];
Object.keys(arr).forEach(function (key) {
    Object.defineProperty(arr, key, {
        get() {
            console.log('key', key);
        },
        set(val) {
            console.log('value', val);
        },
    });
});
arr[1];
arr[2] = 4;
