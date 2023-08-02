FROM python:3.10.10-buster

WORKDIR /tieba

VOLUME /tieba /www/wwwroot/tiebaAdmin

RUN apt-get update && pip install -r requirements.txt

CMD ["sh", "start.sh"]
