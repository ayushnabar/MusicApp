import { HttpStatus } from "../constants/https"
import AppError from "./AppError";
import assert from "node:assert";

const appAssert = (condition: boolean, message: string, httpStatusCode: HttpStatus) => assert(condition, new AppError(message, httpStatusCode));

export default appAssert