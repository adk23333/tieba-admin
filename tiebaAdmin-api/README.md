**使用其需要先安装python环境，然后在api目录下执行以下命令安装依赖**

`pip -i requestment.txt`

**接着创建以下两个配置文件**

`aiotieba.toml、setting.toml`

**文件内的内容如下**

#aiotieba.toml 请参考[aiotieba配置教程](https://aiotieba.cc/tutorial/config/)

#setting.toml 参考如下

```toml
[Dev]
[Dev.Run]
host = '0.0.0.0'
port = 3000
debug = true

[Dev.App]
KEEP_ALIVE = true
KEEP_ALIVE_TIMEOUT = 15000
FALLBACK_ERROR_FORMAT = "json"

[Pro]
[Pro.Run]
host = '0.0.0.0'
port = 3000
debug = false

[Pro.App]
KEEP_ALIVE = true
KEEP_ALIVE_TIMEOUT = 15000
FALLBACK_ERROR_FORMAT = "json"

[Handler]
listener = "ln"

[[Handler.Forum]]
fname = "****"
admin_key = "my"
speaker_key = "sp"

[Reviewer]
BDUSS_key = 'my'
fname = '****'
```

**启动命令**

`python server.py`  开发模式

or

`python server.py --prd`  生产模式
