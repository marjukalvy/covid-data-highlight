"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionService = void 0;
var ExceptionService = /** @class */ (function () {
    function ExceptionService() {
    }
    // Error handler for HTTP requests
    ExceptionService.errorHandler = function (err, req, res) {
        if (err.status) {
            res.status(err.status).json({
                error: err.name,
                message: err.message,
            });
        }
        else {
            res.status(500).json({
                error: "InternalServerError",
                message: "Custom unexpected error occurred",
            });
        }
    };
    // Error handler for file operations
    ExceptionService.fileErrorHandler = function (err) {
        if (err.status) {
            console.log(err.message);
        }
        else {
            console.log("Error occurred fetching file");
        }
    };
    return ExceptionService;
}());
exports.ExceptionService = ExceptionService;
