# cs-F372-project: FakeFlix
## Dependances
- expressjs
- js-sha256
- mongodb

## Required Hardware
- Any computer with networking and can run ubuntu 24 or later

## Installation
First install these on your system:
- NodeJS 18.x.x or later
- npm
- mongodb

### Guide
First clone this repo and navigate to the src directory.
Bash:
```
git clone https://github.com/Bryce-W-Frazier/cs-F372-project.git
cd cs-F372-project/src
```

Now Install dependances.
Bash:
```
npm install express js-sha256 mongodb
```

We will setup mongodb for the fakeflix.
Bash:
```
mongosh
```
Mongosh:
```
use fakeflix
db.useraccounts.insertOne({ username: "admin", password_sha256: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
db.createCollection("videos")
```
Exit Mongosh and return to project root dircetory

Now that we have intizied the database we will start the server:
Bash (from project src directory):
```
node server/server.js
```

The server should start up and show it's open port. Now go to the http://localhost:3000, 
you should see a login page. Enter the username "admin" and the default password is "password".



## What is FakeFlix?
FakeFlix is a online streaming platform.
