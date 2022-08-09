const express = require("express");
const bodyParser = require("body-parser");
const path = require('path');
const logger = require('./logger');
const app = express();
app.use(bodyParser.json());
app.use(express.static("public"))

app.set('view engine', 'pug');

const bookRouter = require("./book-router.js")

app.use(logger);

// route chaining
app.route("/chain")
    .get(function (req, res) {
        res.send("GET chain")
    })
    .post(function (req, res) {
        res.send("POST chain")
    })
    .delete(function (req, res) {
        res.send("DELETE chain")
    })

// handling all routes
app.all('/anything/:name?', function (req, res) {
    res.render('index', { name: req.params.name || "CodeLit" });
})

// regex based route
app.get(/abc+/, function (req, res) {
    res.send('Regex based route response');
})

// dynamic routes
app.get("/user/:name", function (req, res) {
    res.send(req.params.name)
})

// modularized routes
app.use('/books', bookRouter);

// consuming query string
app.get('/input', function(req, res) {
    res.send({
        query: req.query,
        appName: req.get('app-name')
    });
})

app.post('/input', function(req, res) {
    const { name } = req.body;
    res.send(`Hello, ${name}`);
})

app.get('/close-conn', function (req, res) {
    res.write("hello");
    res.write("hi");
    res.end();
})

app.get('/json', function (req, res) {
    res.json({name: "codelit"})
})

app.get('/header', function (req, res) {
    res.set('X-CUSTOM-HEADER', 'CodeLit');
    res.json({name: "codelit"})
})

app.get('/status', function (req, res) {
    res.status(404).end();
})

app.get('/login', function (req, res) {
    res.redirect("/json");
})

app.get('/send-file', function (req, res) {
    res.sendFile(path.resolve("./index.html"));
})

app.get('/send-attachment', function (req, res) {
    res.attachment(path.resolve("./index.html"));
    res.end();
})

app.get('/set-cookie', function (req, res) {
    res.cookie('demo', 'demo-cookie');
    res.end();
})

app.get('/clear-cookie', function (req, res) {
    res.clearCookie('demo');
    res.end();
})

const port = process.env.PORT || 8000;
app.listen(port, function() {
    console.log(`Server started at ${port}`);
});