export class Request {
	static instance;

	constructor() {
		this.cache = {};
	}

	// 获取全局唯一实例
	static getInstance() {
		if (this.instance) {
			return this.instance;
		}
		this.instance = new Request();
		return this.instance;
	}

	async request(url) {
		// 发送请求
	}
}

const request = Request.getInstance();
await request.request("/api/1");
