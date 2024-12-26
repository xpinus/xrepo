onmessage = function (e) {
	console.log("Worker: Message received from main script");
	postMessage("Hello web");
};

setInterval(() => {
	postMessage("worker is waitting...");
}, 2000);
