export const jsonSuccess = (res, code, message, data, rest) => {
    return res.status(code || 200).send({
        success: true,
        message,
        data,
        ...rest,
    });
};

export const jsonFailed = (res, error) => {
    return res.status(error?.statusCode || 500).send({
        success: false,
        message: error?.message,
        error,
    });
};
