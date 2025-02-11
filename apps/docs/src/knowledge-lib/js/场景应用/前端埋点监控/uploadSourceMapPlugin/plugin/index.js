const { sources } = require("webpack");
const axios = require("axios");
const ora = require("ora");

class UploadSourceMapPlugin {
	constructor(params) {
		this.enable = typeof params?.enable === "boolean" ? params?.enable : true;
		this.uploadURL =
			params?.uploadURL || "http://127.0.0.1:7001/logstore/uploadMap";
	}

	apply(compiler) {
		compiler.hooks.emit.tapAsync(
			"UploadSourceMapPlugin",
			(compilation, callback) => {
				if (this.enable) {
					for (let key in compilation.assets) {
						if (key.endsWith(".js")) {
							console.log(key);
							const asset = compilation.getAsset(key);
							const contents = asset.source.source();

							let newContent = contents.split("\n");
							newContent.pop();
							newContent = newContent.join("\n");

							compilation.updateAsset(key, new sources.RawSource(newContent));
						}
						if (key.endsWith(".js.map")) {
							console.log(key);
							const spinner = ora(`UpLoading ${key} \n`).start();
							const asset = compilation.getAsset(key);
							const body = {};
							body[key] = asset.source.source();

							axios({
								method: "post",
								url: this.uploadURL,
								data: body,
							})
								.then(() => {
									spinner.color = "green";
									spinner.succeed(` ${key} uploaded \n`);
								})
								.catch((e) => {
									console.log(e);
									spinner.color = "red";
									spinner.fail(` ${key} upload failed \n`);
								});

							compilation.deleteAsset(key);
						}
					}
				}
				callback();
			}
		);
	}
}

module.exports = UploadSourceMapPlugin;
