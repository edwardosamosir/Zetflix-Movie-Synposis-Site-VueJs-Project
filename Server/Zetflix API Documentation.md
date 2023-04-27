# Zetflix API Documentation

## Endpoints:

List of available endpoints:

- `POST users/register`
- `POST users/login`
- `POST users/login-with-google`
- `POST /movies`
- `GET /movies`
- `GET /movies/:id`
- `DELETE /movies/:id`
- `PATCH /movies/:id`
- `PUT /movies/:id`
- `GET /genres`
- `POST /genres`
- `DELETE /genres/:id`
- `PUT /genres/:id`
- `GET /histories`
- `POST /customers/register`
- `POST /customers/login`
- `POST /customers/login-with-google`
- `GET /customers/movies?page=`
- `GET /customers/genres`
- `GET /customers/movies/:id`
- `POST /customers/favorites/:id`
- `GET /customers/favorites`

## POST users/register

### Description

- Create new user with role Admin  to system

### Request

- Body
  ```json
  {
    "username": "string",
    "email" : "string",
    "password" : "string",
    "phoneNumber" : "string",
    "address": "string"
  }
  ```

### Responses:

_201 - Created_

```json
{
  "id": "integer",
  "email": "string",
  "message": "User with email <user_email> and username <user_username> is succesfully registered"
}
```

_400 - Bad Request_

```json
{
  "message": "Username is required!" 
}
OR
{
  "message": "Username already exists, please use another username!"
}
OR
{
  "message": "Email is required!"
}
OR
{
  "message": "Email format is not valid!"
}
OR
{
  "message": "Email is already used, please use another email!"
}
OR
{
  "message": "Password is required!"
}
OR
{
  "message": "Password length min are 5 characters!"
}
```

## POST users/login

### Description

- Log in to application using user's email and password

### Request

- Body
  ```json
  {
    "email" : "string",
    "password" : "string"
  }
  ```

### Responses:

_200 - OK_

```json
{
  "access_token": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "message": "<user_username> is successfully logged in"
}
```

_(400 - Bad Request)_

```json
{
  "message": "Email is Required!"
}
OR
{
  "message": "Password is Required!"
}
```

_(401 - Unauthorized)_

```json
{
  "message": "Invalid email or password "
}
```

## POST users/login-with-google

### Description

- Create User and Log in to application using user's google account(social media)

### Request

- Headers

```json
{
  "google_access_token": "<user_google_access_token>"
}
```

### Responses:

_200 - OK_

```json
{
  "access_token": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "message": "<user_username> is successfully logged in"
}
```

_201 - Created_

```json
{
  "access_token": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "message": "User with email <user_email> and username <user_username> is succesfully registered"
}
```

## POST /movies

### Description

- Create new movie to database

### Request:

- Headers

```json
{
  "access_token": "string"
}
```
- user

```json
{
  "authorId": "integer"
}
```
- body

```json
{
  "title": "string",
  "synopsis": "string",
  "trailerUrl": "string",
  "imgUrl": "string",
  "rating": "integer",
  "genreId": "integer",
}
```

### Responses:

_(201 - Created)_

```json
{
  "id": "integer",
  "title": "string",
  "synopsis": "string",
  "imgUrl": "string",
  "trailerUrl": "string",
  "rating": "integer",
  "genreId": "integer",
  "authorId": "integer",
  "status": "string",
  "updatedAt": "date",
  "createdAt": "date",
  "message": "Succesfully Added <movie_title> Movie!"
}
```

_(400 - Bad Request)_

```json
{
  "message": "Title is Required"
}
OR
{
  "message": "Synopsis is Required"
}
OR
{
  "message": "Rating is Required"
}
OR
{
  "message": "Minimum Rating 1"
}
```


## GET /movies

### Description

- Get all movies from database

### Request:

- Headers

```json
{
  "access_token": "string"
}
```

### Responses:

_(200 - OK)_

```json
[
    {
        "id": 7,
        "title": "3 Idiots",
        "synopsis": "Rascal. Joker. Dreamer. Genius... You've never met a college student quite like Rancho..........",
        "trailerUrl": "https://www.youtube.com/watch?v=xvszmNXdM4w",
        "imgUrl": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/66A9MqXOyVFCssoloscw79z8Tew.jpg",
        "rating": 8,
        "genreId": 1,
        "authorId": 25,
        "createdAt": "2023-03-19T17:31:11.908Z",
        "updatedAt": "2023-03-19T17:31:11.908Z",
        "author": {
            "id": 25,
            "username": "smintyn",
            "email": "schiddyn@kickstarter.com",
            "role": "Staff",
            "phoneNumber": "4581447450",
            "address": "07133 Lakewood Court",
            "createdAt": "2023-03-19T17:31:10.062Z",
            "updatedAt": "2023-03-19T17:31:10.062Z"
        },
        "Genre": {
            "id": 1,
            "name": "Comedy",
            "createdAt": "2023-03-19T17:31:11.651Z",
            "updatedAt": "2023-03-19T17:31:11.651Z"
        }
    }
    ....
]
```


## Get /movies/:id

### Description

- Get a movie by id

### Request:

- Headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

### Responses:

_(200 - OK)_

```json
[
  {
        "id": 1,
        "title": "Avengers: Infinity War",
        "synopsis": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle....",
        "trailerUrl": "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
        "imgUrl": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
        "rating": 8,
        "genreId": 11,
        "authorId": 1,
        "createdAt": "2023-03-19T17:31:11.908Z",
        "updatedAt": "2023-03-19T17:31:11.908Z",
        "author": {
            "id": 1,
            "username": "edwardosamosir",
            "email": "edwardosamosir@gmail.com",
            "role": "Admin",
            "phoneNumber": "81200009999",
            "address": "882 Fremont Trail",
            "createdAt": "2023-03-19T17:31:04.332Z",
            "updatedAt": "2023-03-19T17:31:04.332Z"
        },
        "Genre": {
            "id": 11,
            "name": "Science Fiction",
            "createdAt": "2023-03-19T17:31:11.651Z",
            "updatedAt": "2023-03-19T17:31:11.651Z"
        }
    }
]
```

_(404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

## Delete /movies/:id

### Description

- Delete a movie by id

### Request:

- Headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

### Responses:

_(200 - OK)_

```json
{
  "message": "Successfully Removed <movie_title> Movie."
}
```

_(403 - Forbidden)_

```json
{
  "message": "Forbidden"
}
```

_(404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

## PUT /movies:id

### Description

- Edit a movie from database

### Request:

- Headers

```json
{
  "access_token": "string"
}
```
- user

```json
{
  "author": "string"
}
```
- body

```json
{
  "title": "string",
  "synopsis": "string",
  "trailerUrl": "string",
  "imgUrl": "string",
  "rating": "integer",
  "genreId": "integer",
}
```

### Responses:

_(200 - OK)_

```json
{
  "id": "integer",
  "title": "string",
  "synopsis": "string",
  "imgUrl": "string",
  "trailerUrl": "string",
  "rating": "integer",
  "genreId": "integer",
  "status": "string",
  "updatedAt": "date",
  "createdAt": "date",
  "message": "Succesfully Updated <movie_title> Movie!"
}
```

_(204 - NO CONTENT)_

```json
{
  "id": "integer",
  "title": "string",
  "synopsis": "string",
  "imgUrl": "string",
  "trailerUrl": "string",
  "rating": "integer",
  "genreId": "integer",
  "status": "string",
  "updatedAt": "date",
  "createdAt": "date",
}
```

_(400 - Bad Request)_

```json
{
  "message": "Title is Required"
}
OR
{
  "message": "Synopsis is Required"
}
OR
{
  "message": "Rating is Required"
}
OR
{
  "message": "Minimum Rating 1"
}
```

## PATCH /movies:id

### Description

- Edit the status of a movie from database

### Request:

- Headers

```json
{
  "access_token": "string"
}
```
- user

```json
{
  "author": "string"
}
```
- body

```json
{
  "status": "string",
}
```

### Responses:

_(200 - OK)_

```json
{
  "id": "integer",
  "title": "string",
  "synopsis": "string",
  "imgUrl": "string",
  "trailerUrl": "string",
  "rating": "integer",
  "genreId": "integer",
  "status": "string",
  "updatedAt": "date",
  "createdAt": "date",
  "message": "<movie_title> movie status has been updated successfully!"
}
```


## GET /genres

### Description

- Get all movie genres from database

### Request:

- Headers

```json
{
  "access_token": "string"
}
```

### Responses:

_(200 - OK)_

```json
[
  {
        "id": 6,
        "name": "Action",
        "createdAt": "2023-03-19T17:31:11.651Z",
        "updatedAt": "2023-03-19T17:31:11.651Z"
    },
    {
        "id": 2,
        "name": "Adventure",
        "createdAt": "2023-03-19T17:31:11.651Z",
        "updatedAt": "2023-03-19T17:31:11.651Z"
    },
    {
        "id": 12,
        "name": "Animation",
        "createdAt": "2023-03-19T17:31:11.651Z",
        "updatedAt": "2023-03-19T17:31:11.651Z"
    },
    {
        "id": 1,
        "name": "Comedy",
        "createdAt": "2023-03-19T17:31:11.651Z",
        "updatedAt": "2023-03-19T17:31:11.651Z"
    }
  ...
]
```

## POST /genres

### Description

- Create new a movie genre to database

### Request:

- Headers

```json
{
  "access_token": "string"
}
```

- body

```json
{
  "name": "string"
}
```

### Responses:

_(201 - Created)_

```json
{
  "name": "string",
  "message": "Succesfully Added <genre_name> Genre!"
}
```

_(400 - Bad Request)_

```json
{
  "message": "Genre is required!"
}
```

## Delete /genres/:id

### Description

- Delete a genre by id

### Request:

- Headers

```json
{
  "access_token": "string"
}
```

- params

```json
{
  "id": "integer"
}
```

### Responses:

_(200 - OK)_

```json
{
  "message": "Successfully Removed <genre_name> Genre."
}
```

_(404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

## PUT /genres:id

### Description

- Edit a genre from database

### Request:

- Headers

```json
{
  "access_token": "string"
}
```

- body

```json
{
  "name": "string",
}
```

### Responses:

_(200 - OK)_

```json
{
  "id": "integer",
  "name": "string",
  "message": "Succesfully Updated <genre_name> Movie!"
}
```

_(204 - NO CONTENT)_

```json
{
  "id": "integer",
  "name": "string",
}
```

_(400 - Bad Request)_

```json
{
  "message": "Genre is required"
}
```

## GET /histories

### Description

- Get all movie update histories log from database

### Request:

- Headers

```json
{
  "access_token": "string"
}
```

### Responses:

_(200 - OK)_

```json
[
  ...
        {
            "id": 2,
            "title": "3 Idiots",
            "description": "Movie status with id 7 has been updated from Archived to Inactive",
            "updatedBy": "edwardosamosir@gmail.com",
            "createdAt": "2023-03-28T06:29:37.621Z",
            "updatedAt": "2023-03-28T06:29:37.621Z"
        },
        {
            "id": 1,
            "title": "3 Idiots",
            "description": "Movie status with id 7 has been updated from Active to Archived",
            "updatedBy": "edwardosamosir@gmail.com",
            "createdAt": "2023-03-28T06:29:33.562Z",
            "updatedAt": "2023-03-28T06:29:33.562Z"
        }
]
```

## POST customers/register

### Description

- Create new user with role Customer to system

### Request

- Body
  ```json
  {
    "username": "string",
    "email" : "string",
    "password" : "string",
    "phoneNumber" : "string",
    "address": "string"
  }
  ```

### Responses:

_201 - Created_

```json
{
  "id": "integer",
  "email": "string",
  "message": "User with email <user_email> and username <user_username> is succesfully registered"
}
```

_400 - Bad Request_

```json
{
  "message": "Username is required!" 
}
OR
{
  "message": "Username already exists, please use another username!"
}
OR
{
  "message": "Email is required!"
}
OR
{
  "message": "Email format is not valid!"
}
OR
{
  "message": "Email is already used, please use another email!"
}
OR
{
  "message": "Password is required!"
}
OR
{
  "message": "Password length min are 5 characters!"
}
```

## POST customers/login

### Description

- Log in to application using user's email and password

### Request

- Body
  ```json
  {
    "email" : "string",
    "password" : "string"
  }
  ```

### Responses:

_200 - OK_

```json
{
  "access_token": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "message": "<user_username> is successfully logged in"
}
```

_(400 - Bad Request)_

```json
{
  "message": "Email is Required!"
}
OR
{
  "message": "Password is Required!"
}
```

_(401 - Unauthorized)_

```json
{
  "message": "Invalid email or password "
}
```

## POST customers/login-with-google

### Description

- Create User and Log in to application using user's google account(social media)

### Request

- Headers

```json
{
  "google_access_token": "<user_google_access_token>"
}
```

### Responses:

_200 - OK_

```json
{
  "access_token": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "message": "<user_username> is successfully logged in"
}
```

_201 - Created_

```json
{
  "access_token": "string",
  "username": "string",
  "email": "string",
  "role": "string",
  "message": "User with email <user_email> and username <user_username> is succesfully registered"
}
```

### GET /customers/movies?page=
#### Description
- Get movies with pagination (9 entity) for Users(customers).

#### Request
- Query
  ```json
  {
    "filter": "string",
    "page" : "Integer"
  }
  ```

#### Response
_200 - Ok_

  ```json
  {
    "result": {
        "count": 13,
        "data": [
            {
                "id": 1,
                "title": "Avengers: Infinity War",
                "genre": "Science Fiction",
                "trailerUrl": "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
                "imgUrl": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
                "rating": 8
            },
            {
                "id": 2,
                "title": "John Wick: Chapter 3 - Parabellum",
                "genre": "Action",
                "trailerUrl": "https://www.youtube.com/watch?v=M7XM597XO94",
                "imgUrl": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg",
                "rating": 7
            },
            {
                "id": 3,
                "title": "The Conjuring",
                "genre": "Horror",
                "trailerUrl": "https://www.youtube.com/watch?v=k10ETZ41q5o",
                "imgUrl": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/wVYREutTvI2tmxr6ujrHT704wGF.jpg",
                "rating": 7
            }
        ],
        "page": 1,
        "nextPage": 2,
        "maxPage": 5
    }
  }
  ```

## GET /customers/genres

### Description

- Get all movie genres from database for Users(customers).

### Responses:

_(200 - OK)_

```json
[
    {
        "id": 1,
        "name": "Comedy"
    },
    {
        "id": 2,
        "name": "Adventure"
    },
    {
        "id": 3,
        "name": "Romance"
    },
    {
        "id": 4,
        "name": "Crime"
    },
    {
        "id": 5,
        "name": "Drama"
    },
  ...
]
```

## Get /customers/movies/:id

### Description

- Get a movie details by a movie id for Users(customers).

### Request:

- params

```json
{
  "id": "integer"
}
```

### Responses:

_(200 - OK)_

```json
[
  {
    "id": 1,
    "title": "Avengers: Infinity War",
    "synopsis": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
    "trailerUrl": "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
    "imgUrl": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    "rating": 8,
    "genreId": 11,
    "authorId": 1,
    "status": "Active",
    "createdAt": "2023-03-30T00:53:56.456Z",
    "updatedAt": "2023-03-30T00:53:56.456Z",
    "Genre": {
        "id": 11,
        "name": "Science Fiction"
    },
    "author": {
        "id": 1,
        "username": "edwardosamosir"
    },
    "qrcode": "string"
  }
]
```

_(404 - Not Found)_

```json
{
  "message": "Data Not Found"
}
```

### POST /customers/favorites/:id
#### Description
- Add a movie to users(customers) favorites by a movie id

#### Request
- Headers 
  ```json
  {
    "access_token" : "string"
  }
  ```

- Params
  ```json
  {
    "id" : "integer"
  }
  ```

#### Response
_201 - Created_

  ```json
  {
    "message": "You had added ${movie.title} movie to your favorites already."
  }
   OR
  {
    "message": "Successfully adds <movie_title> movie to your favorites."
  }

_400 - Bad Request_

  ```json
  {
    "message": "Access required, please sign in first!"
  }
  
  ```

_404 - Not Found_

```json
{
  "message": "Data Not Found"
}
```

### GET /customers/favorites
#### Description 
- Get all movies on users(customers) favorites

#### Request
- Headers 
  ```json
  {
    "access_token" : "string"
  }
  ```

#### Response
_200 - Ok_

  ```json
  [
    {
        "id": 14,
        "CustomerId": 7,
        "MovieId": 1,
        "createdAt": "2023-03-30T09:23:20.370Z",
        "updatedAt": "2023-03-30T09:23:20.370Z",
        "Movie": {
            "id": 1,
            "title": "Avengers: Infinity War",
            "synopsis": "As the Avengers and their allies have continued to protect the world from threats too large for any one hero to handle, a new danger has emerged from the cosmic shadows: Thanos. A despot of intergalactic infamy, his goal is to collect all six Infinity Stones, artifacts of unimaginable power, and use them to inflict his twisted will on all of reality. Everything the Avengers have fought for has led up to this moment - the fate of Earth and existence itself has never been more uncertain.",
            "trailerUrl": "https://www.youtube.com/watch?v=6ZfuNTqbHE8",
            "imgUrl": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
            "rating": 8,
            "genreId": 11,
            "authorId": 1,
            "status": "Active",
            "createdAt": "2023-03-30T00:53:56.456Z",
            "updatedAt": "2023-03-30T00:53:56.456Z",
            "Genre": {
                "id": 11,
                "name": "Science Fiction",
                "createdAt": "2023-03-30T00:53:56.421Z",
                "updatedAt": "2023-03-30T00:53:56.421Z"
            }
        }
    },
    {
        "id": 15,
        "CustomerId": 7,
        "MovieId": 2,
        "createdAt": "2023-03-30T09:25:04.695Z",
        "updatedAt": "2023-03-30T09:25:04.695Z",
        "Movie": {
            "id": 2,
            "title": "John Wick: Chapter 3 - Parabellum",
            "synopsis": "Super-assassin John Wick returns with a $14 million price tag on his head and an army of bounty-hunting killers on his trail. After killing a member of the shadowy international assassin’s guild, the High Table, John Wick is excommunicado, but the world’s most ruthless hit men and women await his every turn.",
            "trailerUrl": "https://www.youtube.com/watch?v=M7XM597XO94",
            "imgUrl": "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg",
            "rating": 7,
            "genreId": 6,
            "authorId": 23,
            "status": "Active",
            "createdAt": "2023-03-30T00:53:56.456Z",
            "updatedAt": "2023-03-30T00:53:56.456Z",
            "Genre": {
                "id": 6,
                "name": "Action",
                "createdAt": "2023-03-30T00:53:56.421Z",
                "updatedAt": "2023-03-30T00:53:56.421Z"
            }
        }
    },
    ....
  ]
  ```

## Global Error

### Responses:
_(500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```

_(401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}