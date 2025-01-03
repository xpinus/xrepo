# Python

## conda

## 管理conda自身
```shell
conda --version     # 查看conda版本
conda info  # 查看conda当前的一些基本信息
conda config --show  #  查看conda的环境配置

# 设置清华镜像
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
# 设置bioconda
conda config --add channels bioconda
conda config --add channels conda-forge
# 设置搜索时显示通道地址
conda config --set show_channel_urls yes

conda update conda # 更新conda
conda update Anaconda # 更新Anaconda整体


```

### 管理环境
```shell
conda create -n env_name python=3.8  // 创建虚拟环境
conda remove --name env_name --all   // 删除虚拟环境
conda remove --name env_name  package_name  // 只删除虚拟环境中的某个或者某些包
conda env list  // 查看有哪些虚拟环境
conda activate env_name // 激活虚拟环境
conda activate   // 退出虚拟环境
conda deactivate

//  导出环境 
#获得环境中的所有配置
conda env export --name myenv > myenv.yml
#重新还原环境
conda env create -f  myenv.yml
```

### 包（Package）的管理
```shell
// 查询包的安装情况
conda list
// 查询是否有安装某个包
conda list pkgname*   
// 查询当前Anaconda repository中是否有你想要安装的包
conda search package_name
// 安装一个包
conda install package_name
conda install numpy=0.20.3 // 指定版本
conda update numpy  // 更新
// 卸载
conda uninstall package_name
// 清理anaconda缓存
conda clean -p      # 删除没有用的包 --packages
conda clean -t      # 删除tar打包 --tarballs
conda clean -y -all # 删除所有的安装包及cache(索引缓存、锁定文件、未使用过的包和tar包)
```

### Python版本的管理
```shell
python --version

# 将版本变更到指定版本
conda install python=3.5
conda update python  # 更新到最新版本
```

**vscode中打开conda终端**
https://blog.csdn.net/qq_64606903/article/details/138170807