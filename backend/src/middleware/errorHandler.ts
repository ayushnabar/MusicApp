import { ErrorRequestHandler } from "express";
import { INTERNAL_SERVER_ERROR } from "../constants/https";
import { z } from "zod";
import { BAD_REQUEST } from "../constants/https";

const handleZodError = (error: z.ZodError, res: any) => {
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

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof z.ZodError) {
        return handleZodError(err, res)
    }

    console.log(err)
    res.status(INTERNAL_SERVER_ERROR).json({
        message: "INTERNAL SERVER ERROR"
    })
}

export default errorHandler