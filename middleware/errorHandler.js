const { constants } = require('../enums/constants');
const errorHandler = (err, req, res, next) => {
    if (res.statusCode == 200 && err.message.includes("Error: ")) { //se ci troviamo in questa situazione probabilmente è esplosa una query
        res.statusCode = 500;
    }
    const statusCode = res.statusCode ? res.statusCode : 500;
    let json;
    switch (statusCode) {
        case constants.VALIDATION_ERROR:
            json = { title: "Validation Failed", message: err.message, stackTrace: err.stack };
            break;
        case constants.NOT_FOUND:
            json = { title: "Not Found", message: err.message, stackTrace: err.stack };
            break;
        case constants.FORBIDDEN:
            json = { title: "Forbidden", message: err.message, stackTrace: err.stack };
            break;
        case constants.UNAUTHORIZED:
            json = { title: "Unauthorized", message: err.message, stackTrace: err.stack };
            break;
        case constants.SERVER_ERROR:
            json = { title: "Server error", message: err.message, stackTrace: err.stack };
            break;
    }
    if (process.env.NODE_ENV === "production") {
        delete (json.stackTrace);
    }
    res.send(json);
};
module.exports = errorHandler;