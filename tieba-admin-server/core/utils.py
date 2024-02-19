import importlib
import os
import random
import re
import string

from sanic import Request
from sanic.response import json as sanic_json, HTTPResponse

from .exception import ArgException


def json(message: str = "success", data=None, status_code: int = 200) -> HTTPResponse:
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


def get_modules(path):
    """
    获取插件模块
    Args:
        path: 获取的目录

    Returns:
        Dict[module_name_str, ModuleType]

    """
    module_names = [d for d in os.listdir(path) if
                    os.path.isdir(os.path.join(path, d)) and not d.startswith('.') and not d.startswith('__')]
    modules = {}
    for module_name in module_names:
        module = importlib.import_module(f"plugins.{module_name}")
        modules[module_name] = module
    return modules


def generate_random_string(length):
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))
