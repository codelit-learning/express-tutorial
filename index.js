const express = require("express");
const app = express();

const bookRouter = require("./book-router.js")

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
app.all('/anything', function (req, res) {
    res.send(req.method);
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

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Server started at ${port}`);
});