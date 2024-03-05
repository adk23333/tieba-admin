FROM python:3.11-buster

WORKDIR /tieba

COPY . .

RUN apt-get update && pip install -r requirements.txt

CMD ["sh", "start.sh"]
