# twitter-backend

## Steps to start the project

- Clone the project to your local system
- Move to the root directory on the terminal
- For database URI, you can create your database on MongoDB and connect. Otherwise, reach out to me for further help regarding DB connection
- It's recommended to install `nodemon` in your system (command: npm i -g nodemon).
- To start the server, run command `nodemon index.js` or `npm start` (incase you don't want to use nodemon)

## APIS

1. POST - `/api/signup`
    - Input:
      - body: {
        userId: required,
        password: required
      }
    - Sample Outputs:
      - In case of either `userId` or `password` missing: `Error 400: Invalid request`
      - In case of duplicate `userId`: `Error 409: User already exists`
      - In case of internal error: `Error 500: Internal Server Error`
      - Else: `Success 200: User created successfully`


2. POST - `/api/postmessage`
    - Input:
      - headers: {
          'user-id': required,
          'password': required
        }
      - body: {
          message: required
        }
    - Sample Outputs:
      - In case of invalid `UserId` or `Password`: `Error 401; message: Unauthorized`
      - In case of `message` is missing: `Error 400; message: Invalid request`
      - In case of internal error: `Error 500; message: Internal Server Error`
      - Else: `Success 200; message: Message posted successfully`


3. POST - `/api/followuser`
    - Input:
      - headers: {
          'user-id': required,
          'password': required
        }
      - body: {
          userId: required
        }
    - Sample Outputs:
      - In case of invalid `UserId` or `Password`: `Error 401; message: Unauthorized`
      - In case of the wrong userId: `Error 404; message: User not found`
      - In case of already following the user with 'userId': `Error 409; message: Already following the user`
      - In case of internal error: `Error 500; message: Internal Server Error`
      - Else: `Success 200; message: You are now following 'userId'`


3. POST - `/api/getmyfeed`
    - Input:
      - headers: {
          'user-id': required,
          'password': required
        }
    - Sample Outputs:
      - In case of invalid `UserId` or `Password`: `Error 401; message: Unauthorized`
      - In case of internal error: `Error 500; message: Internal Server Error`
      - Else: `Success 200; feed: "List of followings' and own messages"`



#### In case of further queries, feel free to reach out to me on <a href="mailto:pomkarnath98@gmail.com?subject=[GitHub]%20Queries%20Regarding%20Project%20`twitter-backend`"><img src="https://img.shields.io/badge/gmail-%23DD0031.svg?&style=for-the-badge&logo=gmail&logoColor=white"/></a>
