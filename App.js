// Import the Express framework for a Node.js web application framework used to build web servers and APIs.
const express = require('express');
// Creating an new instance of an Express application(App), which will be used to define routes and middleware
// This `app` object is used to configure the server, define routes, and handle requests.
const app = express();

// Middleware that enables the server to parse incoming JSON requests
// This is useful when handling API requests with JSON data in the body
// Middleware to parse incoming JSON data in the request body.
// When a client sends data in JSON format (e.g., in a POST or PUT request), this middleware
// automatically parses it into a JavaScript object and makes it available in `req.body`.
app.use(express.json());

// Import the CORS (Cross-Origin Resource Sharing) middleware.
// CORS is a security feature that allows or restricts requests from different origins (domains).
// By default, browser block cross-origin requests, but this enables it and CORS prevents errors when making API requests
// This is necessary when your frontend (running on one domain) communicates with your backend (running on another domain).
const cors = require('cors');
// Enable CORS for all routes in the application.
// This allows the server to accept requests from any domain (by default).
// You can configure CORS to restrict access to specific domains if needed.
app.use(cors());

// Import Mongoose, an ODM (Object Data Modeling) library for MongoDB.
// Mongoose provides a schema-based solution to model your application data and interact with MongoDB.
const mongoose = require('mongoose');
// Connect to a MongoDB database running locally on port 27017.
// The connection string `mongodb://127.0.0.1:27017/Vinfotech` specifies:
// - `127.0.0.1`: The local IP address (localhost).
// - `27017`: The default port for MongoDB.
// - `Vinfotech`: The name of the database.
// If the database does not exist, MongoDB will create it automatically.
mongoose.connect("mongodb://127.0.0.1:27017/Vinfotech");

// Import the route handlers from the './Route' file.
// This file likely contains definitions for various API endpoints (e.g., GET, POST, PUT, DELETE).
// These routes handle specific requests and send responses back to the client.
const route = require('./Route');
// Import the registration route handlers from the './Registration/Registration_Route' file.
// This file likely contains routes related to user registration, such as creating a new user or logging in.
const Registration_route = require('./Registration/Registration_Route');

// Serve static files (e.g., images) from the 'Images' directory.
// When a client requests a file from the `/images` path (e.g., `/images/photo.jpg`), the server will look for
// the file in the `Images` folder and send it back as a response.
// This is useful for serving assets like images, CSS, or JavaScript files.
app.use('/images', express.static('Images'))

// Use the imported route handlers for requests to the root path ('/').
// All routes defined in './Route' will be accessible under `/`.
// For example, if `./Route` defines a route like `/users`, it will be accessible as `/users`.
app.use('/', route);
// Use the imported registration route handlers for requests to the root path ('/').
// All routes defined in './Registration/Registration_Route' will be accessible under `/`.
// For example, if `./Registration/Registration_Route` defines a route like `/register`, it will be accessible as `/register`.
app.use('/', Registration_route);

// Define a GET route for the root path ('/').
// When a client sends a GET request to the root URL (e.g., `http://localhost:8000/`), the server responds
// with the message "Database connected!!".
// This is often used as a simple health check or to confirm that the server is running.
app.get(('/'), (req, res) => 
    res.send("Database connected!!")
);

// Start the server and make it listen on port 8000.
// The server begins accepting incoming requests on port 8000.
// Once the server starts, the callback function is executed, and a message is logged to the console.
app.listen(8000, () => {
    console.log(`App listening on port 8000`);
})