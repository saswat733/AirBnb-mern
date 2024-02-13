import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    try {
        // Extract token from cookies or Authorization header
        let token = req.cookies?.accessToken || req.header("Authorization") || "";

        // Remove "Bearer" prefix and trim any leading or trailing spaces
        token = token.replace("Bearer", "").trim();

        // Throw error if no token is found
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }

        // Verify token authenticity
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log('Decoded token:', decodedToken);

        // Find user corresponding to decoded user ID
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        // Throw error if user is not found
        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // Attach user object to request
        req.user = user;
        console.log(user)

        // Pass control to next middleware
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});
