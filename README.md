# cs-F372-project: FakeFlix

## What is FakeFlix?
FakeFlix is an online streaming platform built for the web.

When users first connect to the site, they are routed to the **Login** page. If a viewer already has an account, they can sign in with their credentials. If a viewer doesn't have an account, they may create one by clicking the link to the **Sign Up** page.

Once logged in, viewers can browse the media gallery, select a movie, and stream it directly in their browser.

**Content Managers** have access to a dedicated upload area. There, they can input the title and release year of a movie, upload the movie's video file (in `.webm` format) alongside a thumbnail image (in `.png` format), and click "Upload" to securely submit the film to the database.

---

## System Requirements
- **Hardware:** Any computer with networking capabilities.
- **Operating System:** Ubuntu 24.04 LTS (or later).

## NPM Packages
- `express` (Web framework for NodeJS)
- `js-sha256` (Cryptographic hashing for secure passwords)
- `mongodb` (NoSQL database driver)
- `multer` (Middleware for handling file uploads)

---

## Installation & Deployment Guide

### 1. Install System Prerequisites
If you are starting from a fresh installation of Ubuntu 24, you must install NodeJS, npm, and MongoDB before running the project. Open your terminal and run the following commands exactly as written:

```bash
# Update your system's package list and install curl
sudo apt update
sudo apt install -y curl

# Fetch the official NodeSource repository (Node 20 LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# Install NodeJS (This package automatically includes NPM!)
sudo apt install -y nodejs

# Import MongoDB Security Key and Add Repository
curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | sudo gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list

# Update package lists again to see the new MongoDB repo
sudo apt update

# Install MongoDB Community Edition (includes mongosh)
sudo apt install -y mongodb-org

# Start the MongoDB service
sudo systemctl start mongod

# (Optional) Enable MongoDB to run on boot
sudo systemctl enable mongod
```

### 2. Clone the Repository
Download the project files from GitHub and navigate into the source code directory.

```bash
git clone https://github.com/Bryce-W-Frazier/cs-F372-project.git
cd cs-F372-project/src
```

### 3. Install Project Dependencies
Use `npm` to install the required Node packages locally for the project.

```bash
npm install express js-sha256 mongodb multer
```

### 4. Initialize the Database
We need to set up the MongoDB database for FakeFlix and create the default admin account. First, open the MongoDB shell by typing:

```bash
mongosh
```

Once inside the `mongosh` environment, copy and paste the following commands one by one, pressing **Enter** after each:

```javascript
// Create and switch to the FakeFlix database
use fakeflix

// Create the default admin account
db.useraccounts.insertOne({ username: "admin", password_sha256: "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8" })

// Initialize the necessary collections
db.createCollection("videos")
db.createCollection("marketing_messages")
```

*Note: Once you see the success messages for the above commands, type `exit` and press Enter to return to your standard Ubuntu terminal.*

### 5. Start the Server
Now that dependencies are installed and the database is initialized, you can start the FakeFlix server. Make sure your terminal is still inside the `cs-F372-project/src` directory!

```bash
node server.js
```

### 6. Access the Application
The terminal should output a message indicating the server has started and displaying its open port.

Open your web browser and navigate to:
**http://localhost:3000**

You should see the FakeFlix login page.
- **Default Username:** `admin`
- **Default Password:** `password`

