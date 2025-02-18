var a = {
    value: 1,
    toString() {
        return this.value++;
    },
};
if (a == 1 && a == 2 && a == 3) {
    console.log(1);
}
