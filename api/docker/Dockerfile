FROM node:14.15.0

WORKDIR /app

COPY . .
RUN yarn install

COPY api/docker/root/ /

ENTRYPOINT ["/entrypoint.sh"]
