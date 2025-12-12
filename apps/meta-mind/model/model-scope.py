"""   从ModelScope下载模型   """
from modelscope import snapshot_download

# https://www.modelscope.cn/docs/models/download
model_dir = snapshot_download(
    model_id="iic/CosyVoice2-0.5B",
    cache_dir="D:\ollama_models\modelscope"
)