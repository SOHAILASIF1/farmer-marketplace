import jwt from "jsonwebtoken"
import userModel from "../model/userModel.js"
import { ApiError } from "../utils/ApiError.js"
export const protect = async (req, res,next) => {
    try {
        let token = req.cookies?.token
        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            throw new ApiError(401, "Not Login")

        }
        let decode;
        try {
            decode = jwt.verify(token, process.env.JWT_SECRET)
        } catch (error) {
            throw new ApiError(401, "invalid or expired token")

        }
        const user = await userModel.findById(decode.id)
        if (!user) throw new ApiError(401, "User Not Found")
        if (user.isBlocked) throw new ApiError(403, "Account Blocked")
         req.user=user
        next()   
    } catch (err) {
        next(err)

    }
}