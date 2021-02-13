const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');         // Built-In Module

// Initializing Express 
const app = express();

// Setting Up the Port
const PORT = process.env.PORT || 8080;

// Setting up Mongoose for MongoDB
// The connect() takes in 2 parameters.
// FIRST Parameter is the pointer to Local Environment
// SECOND Parameter is the Options which we can pass to MongoDB
mongoose.connect('mongodb://localhost/mern_accime', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Listener for our mongoose i.e it would convey if the mongoose connection is successful or Not.
// 'connected' is a built-in event for our 'connection.on()' listener
mongoose.connection.on('connected', () => {
    console.log("Mongoose is Connected!!") });

// Schema i.e We Specify Which field would contain what type of Data..
const Schema = mongoose.Schema;
const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date: {
        type:String,
        default: Date.now()
    }
});

// Model i.e we would compile our Schema
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// Defining Schema of our MongoDB Database i.e what data is to br saved is passed from here
const data = {
    title:"Hello",
    body: "Hi"
};

// Now, we would create instance of our Model
const newBlogPost = new BlogPost(data);

// For Saving our instance of Data in our Model, we would use the 'save()' method
newBlogPost.save((error) => {
    if(error)
    {
        console.log("Oops, Something Happened");
    }
    else
    {
        console.log("Data has been Saved!");
    }
});

// HTTP Request Logger that would log all our HTTP Requests in the Console.
app.use(morgan('tiny'));

// ENDPOINTS
// Once the Data is actually stored in the DB, we would query the DB and Receive the Data at our endpoint instead of displaying dummy Data
app.get('/api', (req, res) => {
    
    // We would now find the data which we had saved to the MongoDB Database via the Model Instance.
    BlogPost.find({data})
        .then((data) => {
            console.log('Data:', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', error);
        });
});

app.get('/api/name', (req, res) => {
    const data = {
        username: "abcdeffg",
        age: 10
    };
    res.json(data);
});

// START THE SERVER
app.listen(PORT, () => {
    console.log(`The application started successfully on port ${PORT}`);
});