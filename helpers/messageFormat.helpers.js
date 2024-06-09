exports.jsonSuccess = (res, code, message, data, rest) => {
    return res.status(code || 200).send({
        success: true,
        message,
        data,
        ...rest,
    });
};

exports.jsonFailed = (res, error) => {
    return res.status(error?.statusCode || 500).send({
        success: false,
        message: error?.message,
        error,
    });
};
