Run these

npm install express knex pg dotenv


Docker Directions

mkdir -p $HOME/docker/volumes/postgres

docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

docker exec -it <PSQL-Container-ID> bash

psql -U postgres

CREATE DATABASE bank;

c\ bank