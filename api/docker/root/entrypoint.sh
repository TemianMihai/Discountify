#!/bin/bash

PORT=${PORT:-"8080"}
RUN_MIGRATION=${RUN_MIGRATION:-"yes"}

if [[ "$RUN_MIGRATION" == "yes" ]];
then
  echo "Migrating database"
  cd api && yarn run typeorm -- migration:run
fi

echo "Running server on ${PORT}"
PORT=${PORT} yarn workspace api start:dev
