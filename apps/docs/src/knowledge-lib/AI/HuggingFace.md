# Hugging Face 
提供了丰富的预训练模型和工具库，这些资源大大加速了 NLP 任务的开发和部署
[如何在 Hugging Face 上下载和使用模型—全面指南](https://blog.csdn.net/weixin_43114209/article/details/139333334)

## 开始

Getting started with our git and git-lfs interface

You can create a repository from the CLI (skip if you created a repo from the website)

```shell
pip install huggingface_hub
You already have it if you installed transformers or datasets

huggingface-cli login
Log in using a token from huggingface.co/settings/tokens
Create a model or dataset repo from the CLI if needed
huggingface-cli repo create repo_name --type {model, dataset, space}
```

Clone your model, dataset or Space locally

Make sure you have git-lfs installed
(https://git-lfs.github.com)
```shell
git lfs install
git clone https://huggingface.co/username/repo_name
```
Then add, commit and push any file you want, including large files

save files via `.save_pretrained()` or move them here
```shell
git add .
git commit -m "commit from $USER"
git push
```
In most cases, if you're using one of the compatible libraries, your repo will then be accessible from code, through its identifier: username/repo_name

For example for a transformers model, anyone can load it with:

```shell
tokenizer = AutoTokenizer.from_pretrained("username/repo_name")
model = AutoModel.from_pretrained("username/repo_name")
```

## 下载模型并使用

1. 准备工作
```shell
pip install huggingface_hub

huggingface-cli login  # 先去HuggingFace添加access token
```

pytocrh安装 https://zhuanlan.zhihu.com/p/25886152933


2. 下载模型
```python
from huggingface_hub import snapshot_download

# 下载模型文件并保存到本地
# repo_id: 模型的仓库ID
# ignore_regex: 不下载的文件的正则表达式
# local_dir: 模型文件保存的目录
snapshot_download(repo_id="bert-base-chinese", ignore_regex=["*.h5", "*.ot", "*.msgpack"], local_dir="bloom-560m")

print(f"Model directory downloaded to: {local_dir}")
```