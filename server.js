/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Aryan Rakeshbhai Rathod Student ID:129796215 Date: 01-02-2023
*
*  Cyclic Web App URL: 
*
*  GitHub Repository URL: https://github.com/Aryan26101/Web-322-Assignment-2
*
********************************************************************************/ 


var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
var path = require('path');
var blogService = require(__dirname + "/blog-service.js");

onHttpStart = () => {
    console.log('Express http server listening on port ' + HTTP_PORT);
}

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/about')
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname + "/views/about.html"));
});

app.get("/blog", (req, res) => {
    blogService.getPublishedPosts().then((data) => {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get("/posts", (req, res) => {
    blogService.getAllPosts().then((data) => {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.get("/categories", (req, res) => {
    blogService.getCategories().then((data) => {
        res.json({data});
    }).catch((err) => {
        res.json({message: err});
    })
});

app.use((req, res) => {
    res.status(404).end('404 PAGE NOT FOUND');
});

blogService.initialize().then(() => {
    app.listen(HTTP_PORT, onHttpStart());
}).catch ((err) => {
    console.log(err);
});