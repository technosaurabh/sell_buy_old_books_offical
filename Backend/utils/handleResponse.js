exports.sendSuccess = (status, success,res, data = {}, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        status: status,
        success: success,
        message,
        data
    });
};

exports.sendError = (res, error, statusCode = 500) => {
    return res.status(statusCode).json({
        status: false,
        success: false, 
        message: error.message || 'Internal Server Error',
        error: error.stack || null
    });
};