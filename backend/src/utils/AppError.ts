import { HttpStatus } from "../constants/https";

class AppError extends Error {
    constructor(public message: string, public statusCode: HttpStatus) {
        super(message);
    }
}

export default AppError