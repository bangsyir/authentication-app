# BACK END

This project is example of **backend** for authentication app.

### REQUIREMENT

- NODEJS v 14.0 >

### Stack

- DOCKER (for database)
- EXPRESSJS (nodejs framework)
- POSTGRESQL (database)

### Feature

The idea come from how to secure web app between server and client.

this is the feature :

- register.
- login (accessToken, refreshToken).
- get new accessToken when expired.
- auth middleware
- return all users when client is authorized.

### how to run ?

run the docker daatbase image

```sh
# yarn
yarn run docker:start
# docker-compose
docker-compose up -d postgres
```

skip this process if you already have own databse on your computer.

```sh
# npm
npm run dev
# yarn
yarn run dev
```
