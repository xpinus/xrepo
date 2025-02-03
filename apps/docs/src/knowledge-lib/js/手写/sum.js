/**
 * 大整数相加
 * @param{string} a
 * @param{string} b
 */
function sum(a, b) {
    let len = Math.max(a.length, b.length)
    a = a.padStart(len, '0')
    b = b.padStart(len, '0')

    let res = ''
    let carry = 0;
    for (let i = len - 1; i >= 0; i--) {
        const sum = parseInt(a[i]) + parseInt(b[i]) + carry;
        carry = Math.floor(sum / 10);
        res = sum % 10  + res;
    }

    if (carry === 1) {
        res = '1' + res;
    }

    console.log(String(BigInt(a) + BigInt(b)))

    return res;
}

console.log(sum('12414637547634', '78956346436'))