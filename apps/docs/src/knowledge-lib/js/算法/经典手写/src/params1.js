function getParams(url) {
    const res = {};
    if (url.includes('?')) {
        const str = url.split('?')[1];
        const arr = str.split('&');
        arr.forEach((item) => {
            const key = item.split('=')[0];
            const val = item.split('=')[1];
            res[key] = decodeURIComponent(val); // 解码
        });
    }
    return res;
}

// 测试
const url = 'https://cn.bing.com/search?q=%E5%B2%9B%E5%B1%BF%E9%97%AE%E9%A2%98&PC=U316&FORM=CHROMN';
const user = getParams(url);
console.log(user);
