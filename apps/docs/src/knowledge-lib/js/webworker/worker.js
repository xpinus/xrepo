onmessage = function (e) {
	console.log("Worker: Message received from main script");
	postMessage("Hello 浏览器");
};

setInterval(() => {
	postMessage("worker is waitting...");
}, 2000);
