const { sources } = require("webpack");
const FormData = require("form-data");
const axios = require("axios");

class UploadSourceMapPlugin {
	constructor(params) {
		this.getURL = "http://127.0.0.1:7001/logstore/getMap?file=";
		this.uploadURL = "http://127.0.0.1:7001/logstore/uploadMap";
	}

	apply(compiler) {
		compiler.hooks.emit.tapAsync(
			"UploadSourceMapPlugin",
			(compilation, callback) => {
				for (let key in compilation.assets) {
					if (key.endsWith(".js")) {
						console.log(key);
						const asset = compilation.getAsset(key);
						const contents = asset.source.source();

						let newContent = contents.split("\n");
						newContent.pop();
						newContent = newContent.join("\n");
						// const map = newContent[newContent.length - 1].split("=");
						// map[map.length - 1] = this.getURL + map[map.length - 1];
						// newContent[newContent.length - 1] = map.join("=");
						// newContent = newContent.join("\n");

						compilation.updateAsset(key, new sources.RawSource(newContent));
					}
					if (key.endsWith(".js.map")) {
						console.log(key);
						// compilation.deleteAsset(key);
						const asset = compilation.getAsset(key);
						const contents = asset.source.source();

						const body = {};
						body[key] = contents;

						axios({
							method: "post",
							url: this.uploadURL,
							data: body,
						}).catch((e) => console.log(e?.response?.data));

						// var request = new XMLHttpRequest();
						// request.open("POST", this.uploadURL); // 设置服务URL
						// request.send(formData); // 发送表单数据
					}
				}
				callback();
			}
		);
	}
}

module.exports = UploadSourceMapPlugin;
