["1", "2", "3"].map(parseInt).forEach((item) => console.log(item));

// parseInt('1',0);radix 为 0，parseInt() 会根据十进制来解析，所以结果为 1；
// parseInt('2',1);radix 为 1，超出区间范围，所以结果为 NaN；
// parseInt('3',2);radix 为 2，用2进制来解析，应以 0 和 1 开头，所以结果为 NaN

["1", "2", "3"].map(Number).forEach((item) => console.log(item));
