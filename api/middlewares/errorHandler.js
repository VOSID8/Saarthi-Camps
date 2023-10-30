const notFoundError = (req, res, next) => { // invalid url
    const error = new Error(`Not Found : ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const responseError = (err, req, res, next) => { // response error
    const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statuscode);
    res.json({
        status: "fail",
        message: err?.message,
        stack: err?.stack,
    });
};

module.exports = { 
    notFoundError,
    responseError
 };