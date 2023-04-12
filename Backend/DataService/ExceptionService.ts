import { Request, Response, NextFunction } from "express";

export class ExceptionService {
    // Error handler for HTTP requests
    static errorHandler(err: any, req: Request, res: Response) {
        if (err.status) {
            res.status(err.status).json({
                error: err.name,
                message: err.message,
            });
        } else {
            res.status(500).json({
                error: "InternalServerError",
                message: "Custom unexpected error occurred",
            });
        }
    }

    // Error handler for file operations
    static fileErrorHandler(err: any) {
        if (err.status) {
            console.log(err.message);
        } else {
            console.log("Error occurred fetching file");
        }
    }
}
