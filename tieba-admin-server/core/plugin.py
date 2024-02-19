class Plugin(object):
    """
    插件基类，定义了一个插件应该有的属性及方法
    """
    def run(self, **kwargs):
        ...
