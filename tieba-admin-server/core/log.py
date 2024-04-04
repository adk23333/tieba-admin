import os
import sys

from sanic.log import LOGGING_CONFIG_DEFAULTS

if not os.path.exists('./log'):
    os.makedirs('./log')

if not os.path.exists('./.cache'):
    os.makedirs('./.cache')

LOG_FILE_PATH = "./log/server.log"
LOGGING_CONFIG = LOGGING_CONFIG_DEFAULTS
LOGGING_CONFIG.update({
    "handlers": {
        "console": {
            "class": "logging.handlers.RotatingFileHandler",
            "formatter": "generic",
            "filename": LOG_FILE_PATH,
            'encoding': "utf-8",
            'maxBytes': 1024 * 1024 * 1,
            'backupCount': 10,
        },
        "error_console": {
            "class": "logging.handlers.RotatingFileHandler",
            "formatter": "generic",
            "filename": LOG_FILE_PATH,
            'encoding': "utf-8",
            'maxBytes': 1024 * 1024 * 1,
            'backupCount': 10,
        },
        "access_console": {
            "class": "logging.StreamHandler",
            "formatter": "access",
            "stream": sys.stdout,
        },
    },
})
