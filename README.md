# eBuddy Turbo MonoRepo
================

## Introduction
This is the mono repo for eBuddy technical test

## Getting Started
To get started, follow these steps:

1. Clone the main repository: `git clone https://github.com/savire/ebuddy.git`
2. Install dependencies: `npm install`
3. Setup your Firebase Emulator properly and get the functions URL and Setup the Firebase Client Authentication configuration on /apps/frontend-repo/apis/auth.js 
3. Start  : `npm run dev`
4. Start using emulator : `npm run emu`
5. Start backend and frontend using turbo from the mainrepo root : `turbo run dev`
6. Start backend and frontend using turbo with emulator from the mainrepo root : `turbo run emu`. Make sure to run the emulator via /apps/backend-repo/functions folder with : `npm run emu`

### Modules
* `/apps/backend-repo`: Backend API
* `/apps/frontend-repo`: Frontend Website
* `/apps/backend-repo/functions`: Firebase Cloud Functions support with Emulator

## License
The repo is unlicensed