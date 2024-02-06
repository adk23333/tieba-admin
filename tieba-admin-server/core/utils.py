import re

from sanic import Request
from sanic.response import json as sanic_json, HTTPResponse

from core.exception import ArgException


def json(message: str, data, status_code: int = 200) -> HTTPResponse:
    """
    A preformatted Sanic json response.

    Args:
        message (int): Message describing data or relaying human-readable information.
        data (Any): Raw information to be used by client.
        status_code (int): HTTP response code.

    Returns:
        json
    """
    if data is None:
        data = {}
    return sanic_json(
        {"msg": message, "code": status_code, "data": data}, status=status_code
    )


def validate_password(password: str) -> str:
    if not re.search(r"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!/]).*$", password):
        raise ArgException(
            "密码必须包含大小写字母、数字和特殊字符",
        )
    return password


def get_ip(request: Request) -> str:
    return request.remote_addr or request.ip