FROM postgres:13

RUN apt update -y && apt install -y postgresql-contrib
COPY ./docker/db/docker-entrypoint-initdb.d /docker-entrypoint-initdb.d