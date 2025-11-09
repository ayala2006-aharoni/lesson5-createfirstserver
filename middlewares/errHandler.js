export const generalErrorHandler = (err, req, res, next) => {
    const status = err.status || 500;

    const message = err.message || 'Server Error';
    res.status(status).json({
        error: message,
        type: 'server error'
    });
};

export const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        error: 'Route not found',
        type: 'not found'
    });
};

