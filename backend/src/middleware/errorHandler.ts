import { ErrorRequestHandler } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/https";
import { z } from "zod";
import { BAD_REQUEST } from "../constants/https";
import AppError from "../utils/AppError";
import { Response } from "express";

const handleZodError = (error: z.ZodError, res: Response) => {
    console.log(error)
    const errors = error.issues.map((issue) => {
        return {
            code: issue.code,
            message: issue.message,
            path: issue.path[0]
        }
    })
    res.status(BAD_REQUEST).json({
        errors
    })
}

const handleAppError = (res:Response, error: AppError) => {
    res.status(error.statusCode).json({
        message: error.message
    })
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof z.ZodError) {
        return handleZodError(err, res)
    }

    if (err instanceof AppError) {
        return handleAppError(res, err)
    }

    console.log(err)
    res.status(INTERNAL_SERVER_ERROR).json({
        message: "INTERNAL SERVER ERROR"
    })
}

export default errorHandler