FROM python:3.11-bullseye

WORKDIR /tieba

COPY . .

RUN apt-get update && pip install -r requirements.txt

CMD ["sh", "start.sh"]
