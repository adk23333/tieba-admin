from typing import Optional

from sanic import SanicException, response


class ArgException(SanicException):
    status_code = 400

    def __init__(self, message: str = "参数错误"):
        self.message = message


def err_rps(e: Optional[SanicException] = None):
    return response.json({"status": e.status_code, "msg": e.message}, e.status_code)
