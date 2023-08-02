const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: err.stack //Change to null for production
    })
}

module.exports = {
    errorHandler,
}