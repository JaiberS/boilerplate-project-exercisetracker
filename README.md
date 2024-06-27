# Exercise Tracker API

This is an Exercise Tracker API built with Node.js, Express, and MongoDB. The API allows users to create profiles, log exercises, and retrieve exercise logs with various filters.

## Table of Contents

- Installation
- Usage
- Endpoints
- Environment Variables
- License

# Installation

Clone the repository:

    git clone https://github.com/JaiberS/exercise-tracker.git
    cd exercise-tracker

Install dependencies:

    npm install

Set up environment variables:

Create a .env file in the root directory and add your MongoDB URI:

    MONGO_URI=your_mongodb_connection_string

Run the application:

    npm start

The server will start on http://localhost:3000.

# Usage

This API provides endpoints to manage users and their exercise logs. You can use tools like Postman or CURL to test the API endpoints.
Endpoints

## Health Check

### GET /hello

Returns a greeting message.

Response:

    {
      "greeting": "hello API"
    }

## User Endpoints

### GET /api/users

Retrieves the list of all users.

Response:

    [ 
      {
        "_id": "user_id",
        "username": "username",
        "logs": [
          {
            "description": "exercise description",
            "duration": 30,
            "date": "Wed Jun 23 2021"
          }
        ]
      }
    ]

### POST /api/users

Creates a new user.

Request:

    {
      "username": "new_username"
    }

Response:

    {
      "username": "new_username",
      "_id": "new_user_id"
    }

### DELETE /api/users

Deletes all users and their logs.

Response:

    {
      "data": {}
    }

## Exercise Endpoints

POST /api/users/:id/exercises

Adds an exercise to a user's log.

Request:

    {
      "description": "exercise description",
      "duration": 30,
      "date": "2021-06-23"
    }

Response:

    {
      "_id": "user_id",
      "username": "username",
      "date": "Wed Jun 23 2021",
      "duration": 30,
      "description": "exercise description"
    }

### GET /api/users/:id/logs

Retrieves a user's exercise logs with optional filtering by date and limit.

Request Query Parameters:

- from: (optional) Start date in YYYY-MM-DD format.
- to: (optional) End date in YYYY-MM-DD format.
- limit: (optional) Maximum number of logs to retrieve.

Response:

    {
      "_id": "user_id",
      "username": "username",
      "count": 1,
      "log": [
        {
          "description": "exercise description",
          "duration": 30,
          "date": "Wed Jun 23 2021"
        }
      ]
    }

Environment Variables

The application requires the following environment variable to be set:

- MONGO_URI: Your MongoDB connection string.

License

This project is licensed under the MIT License. See the LICENSE file for details.
