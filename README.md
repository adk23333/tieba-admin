# tieba-admin

[![Python versions](https://img.shields.io/badge/python-3.10%7C3.11%7C3.12-blue)]()
[![Version status](https://img.shields.io/badge/status-dev-orange)]()
[![GitHub Repo stars](https://img.shields.io/github/stars/adk23333/tieba-admin?style=flat)]()

基于[aiotieba](https://github.com/Starry-OvO/aiotieba)创建的贴吧管理器，采用**插件式**设计，并提供**开放api**，可以使用默认的网页进行管理。

![截图](https://s2.loli.net/2024/02/14/IB4FZevdGEVfiUK.png)

---

## :+1:开始使用

**:star:直接运行:star:**

clone本仓库
然后到tieba-admin-server目录下
```shell
cd tieba-admin-server
```

执行以下命令

```shell
sanic server:app --host=0.0.0.0 --port=3000 --workers=2
```

然后打开http://localhost:3000/

**:star:docker:star:**


