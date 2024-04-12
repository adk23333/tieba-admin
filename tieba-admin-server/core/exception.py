from sanic import SanicException


class ArgException(SanicException):
    status_code = 400
    message = "参数错误"

    def __init__(self, message: str):
        self.message = message
