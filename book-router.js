const app = require('express');
const router = app.Router();

router.use((req, res, next) => {
    console.log("Book middleware executed");
    next();
})

router.get("/", function(req, res) {
    res.send("Hello from the books router");
})

module.exports = router;