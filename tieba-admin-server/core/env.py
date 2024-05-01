import environs

CACHE_PATH = "./.cache"
CACHE_FILE = "db.sqlite"

env = environs.Env()
env.read_env(recurse=False)

HOST = env.str("HOST", "0.0.0.0")
PORT = env.int("PORT", 3100)
WORKERS = env.int("WORKERS", 1)
WEB = env.bool("WEB", True)
SECRET = env.str("SECRET", "This is a big secret!!!")
DB_URL = env.str("DB_URL", f"sqlite://{CACHE_PATH}/{CACHE_FILE}")
DEV = env.bool("DEV", False)
TZ = env.str("TZ", "Asia/Shanghai")
