from sanic.response import json as sanic_json, HTTPResponse


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
