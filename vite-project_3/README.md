Welcome to Gambler's Credit Union

This app aims to make banking fun by including gambling mechanics

to install the database, please run these commands in your terminal:

mkdir -p $HOME/docker/volumes/postgres

docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 \
-v $HOME/docker/volumes/postgres:/var/lib/postgresql/data postgres

docker exec -it <PSQL-Container-ID> bash

psql -U postgres

CREATE DATABASE bank;

c\ bank

This will create a dockerized database and log you into it to run queries

next, within the backend, run these:

npm install express knex pg dotenv cors
npm install @faker-js/faker --save-dev

You should now be ready to embark on a new financial journey!