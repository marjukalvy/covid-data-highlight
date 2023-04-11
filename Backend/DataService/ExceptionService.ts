import { Request, Response, NextFunction } from "express";

export class ExceptionService {
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


    static fileErrorHandler(err: any) {
        if (err.status) {
            console.log(err.message);
        } else {
            console.log("Error occured fetching File");
        }
    }
}
