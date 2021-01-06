module.exports = (req, res, next) => {
    if (process.env.API_KEY && req.header('x-api-key') !== process.env.API_KEY)
        return res.sendStatus(401);
    else return next();
}