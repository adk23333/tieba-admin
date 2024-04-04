# tieba-admin

[![Python versions](https://img.shields.io/badge/python-3.10%7C3.11%7C3.12-blue)]()
[![Version status](https://img.shields.io/badge/status-dev-orange)]()
[![GitHub Repo stars](https://img.shields.io/github/stars/adk23333/tieba-admin?style=flat)]()

基于[aiotieba](https://github.com/Starry-OvO/aiotieba)创建的贴吧管理器，采用**插件式**设计，并提供**开放api**，可以使用默认的网页进行管理。

![截图](https://s2.loli.net/2024/02/14/IB4FZevdGEVfiUK.png)

---

## ✨开始使用

- **:star:直接运行**

  clone本仓库

  ```shell
  git clone https://github.com/adk23333/tieba-admin.git
  ```

  然后到tieba-admin-server目录下

  ```shell
  cd tieba-admin-server
  ```
  
  安装依赖
  ```shell
  pip install -r requirements.txt
  ```

  执行以下命令启动服务

  ```shell
  sanic server:app --host=0.0.0.0 --port=3000 --workers=1
  ```

  然后打开http://localhost:3000/



- **:star:docker**

  ```shell
  docker push adk23333/tieba-admin:latest
  ```
  
  建议将.cache与log目录共享到宿主机，例如

  ```shell
  -v /tieba/.cache:/to/you/cache/path -v /tieba/log:/to/you/log/path
  ```

## ✨配置

可配置的环境变量有如下这些

| 名称    | 作用                  | 默认值                    |
| ------- | --------------------- | ------------------------- |
| DEV     | 是否使用开发模式      | false                     |
| SECRET  | JWT加密密钥           | This is a big secret!!!   |
| HOST    | 监听网址              | 0.0.0.0                   |
| PORT    | 监听端口              | 3100                      |
| WORKERS | 提供API的工作进程数量 | 1                         |
| WEB     | 是否启用网页          | true                      |
| DB_URL  | 数据库链接            | sqlite://.cache/db.sqlite |

