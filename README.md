# Music Reviews App
This is a node app that allows users to upload and review music. It uses MongoDB to store music and user data, Express for routing, and Passport for authentication.

## Features
- User authentication with Passport
- Upload music files to cloud storage
- Add, edit, delete music entries
- Write, edit, delete reviews for music
- Search music by title, artist, genre
- View most reviewed music
- View user profile and music uploads

## Usage
### Installation
````
npm install
````
### Configure Environment Variables
Create a .env file in the root directory and add the following:
````
MONGO_URI=your_mongoDB_uri
PORT=5000

CLOUD_NAME=your_cloudinary_cloud_name

SESSION_SECRET=your_session_secret
````
### Run the app
````
node app
````

App will be running on http://localhost:5000

