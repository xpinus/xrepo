const paramsStr = 'q=%E5%B2%9B%E5%B1%BF%E9%97%AE%E9%A2%98&PC=U316&FORM=CHROMN';
const urlSearchParams = new URLSearchParams(paramsStr);
const res = Object.fromEntries(urlSearchParams.entries());
console.log(res);
