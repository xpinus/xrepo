onmessage = function (e) {
    console.log('Worker: Message received from main script');
    postMessage('Yes, I got your message! ' + new Date().toISOString());
};

setTimeout(() => {
    postMessage('worker is waitting...');
}, 2000);
