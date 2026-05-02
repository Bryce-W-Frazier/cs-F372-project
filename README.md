# cs-F372-project: FakeFlix
## NPM Packages
- expressjs
- js-sha256
- mongodb
- multer

## Required Hardware
- Any computer with networking and can run ubuntu 24 or later

## Installation
First install these on your system:
- NodeJS 18.x.x or later
- npm 11.12.1 or later
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
npm install express js-sha256 mongodb multer
```
credentials
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
node server.js
```

The server should start up and show it's open port. Now go to the http://localhost:3000, 
you should see a login page. Enter the username "admin" and the default password is "password".



## What is FakeFlix?
FakeFlix is a online streaming platform.

Once a users first connects to the site they are sent to the login page. If the user has an 
account they can sign in with their credentials. If a viewer dosn't have an accout they may 
create one by clicking the link to the sign up page. 

Once a Viewer has logged in, they can click on a movie that in the gallery and watch it. 

A content manger in the the upload area they can Input the title and year of the moive's release. Then upload the Movie's webm file and the thumbnail's png file. Click on upload to sumbit the flim.
