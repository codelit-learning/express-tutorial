module.exports = function (req, res, next) {
    console.log(req.path, req.method, Date.now());
    next();
}