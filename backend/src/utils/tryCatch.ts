import { Request, Response, NextFunction } from "express";

/*
This utility function is to avoid repeating try-catch blocks when working with asynchronous controllers
*/
type AsyncController = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<any>

const tryCatch = (controller: AsyncController) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await controller(req, res, next)
    } catch (e) {
        next(e)
    }
}

export default tryCatch