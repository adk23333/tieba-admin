from typing import Optional

from sanic import SanicException, response


class ArgException(SanicException):
    status_code = 400

    def __init__(self, message: str = "参数错误"):
        self.message = message


def err_rps(e: Optional[SanicException] = None):
    """
    快速返回发生错误时的response
    Args:
        e: 发生的错误
    """
    return response.json({"status": e.status_code, "msg": e.message}, e.status_code)
