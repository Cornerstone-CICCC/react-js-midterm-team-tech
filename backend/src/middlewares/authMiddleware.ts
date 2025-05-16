import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "jfdhuifhkewuhr";

export const authenticateToken = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const token = request.cookies?.token;

    if (!token) {
        response.status(401).json({ message: "No token provided" });

        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);

        console.log("Decoded token:", decoded);

        // @ts-ignore
        request.user = decoded;

        next();
    } catch (err) {
        response.status(403).json({ message: "Invalid token" });

        return;
    }
};

export const verifyAdmin = (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    const token = request.cookies?.token;

    if (!token) {
        response.status(401).json({ message: "No token provided" });

        return;
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;

        console.log("Decoded token:", decoded);

        if (!decoded || decoded.role !== "admin") {
            response.status(422).json({ message: "Permission not allowed" });
            return;
        }

        next();
    } catch (err) {
        response.status(403).json({ message: "Invalid token" });

        return;
    }
};
