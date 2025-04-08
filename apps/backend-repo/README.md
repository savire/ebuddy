# Backend API
================

## Introduction
This is the backend API created as part of eBuddy Recruitment. The API is built using Node.js, Typescript and Express, and is designed to be highly performant and reliable.

## Getting Started
To get started with the API, follow these steps:

1. Clone the main repository: `git clone https://github.com/savire/ebuddy.git`
2. Install dependencies: `npm install`
3. Setup the Firebase Authentication and Database properly and put /apps/backend-repo/serviceAccountKey.json and /apps/backend-repo/functions/lib/serviceAccountKey.json
3. Start backend : `npm run dev`
4. Start backend using emulator : `npm run emu`
5. Start backend and frontend using turbo from the mainrepo root : `turbo run dev`
6. Start backend and frontend using turbo with emulator from the mainrepo root : `turbo run emu`. Make sure to run the emulator via /apps/backend-repo/functions folder with : `npm run emu`

## API Endpoints
The API provides the following endpoints:

### Verification Auth
* `POST /api/verify-user`: Verify User authentication via Firebase Auth

### Data
* `GET /api/fetch-user-data`: Get the authenticated user data
* `PUT /api/update-user-data`: Update the authenticated user data

## Models
The API uses the following models:

### User
* `id`: Unique identifier for the user
* `name`: The user's username
* `email`: The user's email address
* `age`: The user's age
* `achievements`: The user's achievements example
* `totalAverageWeightRatings`: The user's average weight rating
* `numberOfRents`: The user's number of buddy rents
* `recentlyActive`: The user's active timestamp

## License
The API is unlicensed

## Acknowledgments
The API uses the following third-party libraries:

* Firebase
* Express