# FrontEnd Next.js App
================

## Introduction
This is the frontend created as part of eBuddy Recruitment. The API is built using Node.js, Next.js, and is designed to be highly performant and reliable.

## Getting Started
To get started, follow these steps:

1. Clone the main repository: `git clone https://github.com/savire/ebuddy.git`
2. Install dependencies: `npm install`
3. Setup your Firebase Emulator properly and get the functions URL and Setup the Firebase Client Authentication configuration on /apps/frontend-repo/apis/auth.js 
3. Start  : `npm run dev`
4. Start using emulator : `npm run emu`
5. Start backend and frontend using turbo from the mainrepo root : `turbo run dev`
6. Start backend and frontend using turbo with emulator from the mainrepo root : `turbo run emu`. Make sure to run the emulator via /apps/backend-repo/functions folder with : `npm run emu`

## Pages Endpoints
The web provides the following endpoints:

### Landing
* `GET /`: Landing Page

### Business Logic
* `GET /login`: Show login form
* `GET /member`: Show member area

## Models
The web uses the following shared models:

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
The web is unlicensed

## Acknowledgments
The web uses the following third-party libraries:

* Firebase
* React
* Next.js
* MUI UI Library