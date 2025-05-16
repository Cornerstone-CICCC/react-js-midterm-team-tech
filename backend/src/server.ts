import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import serviceRouter from "./routes/serviceAdmin.route";
import orderRouter from "./routes/orderClient.route";
import clientRouter from "./routes/serviceClient.route";
import cookieParser from "cookie-parser";
import { publicRouter, protectedRouter } from "./routes/user.routes";
import { purchaseRouter } from "./routes/purchase.routes";
import { authenticateToken, verifyAdmin } from "./middlewares/authMiddleware";

dotenv.config();

//Create server
const app = express();

//Middlewares
app.use(
    cors({
        origin: process.env.FRONTEND_URL!,
        credentials: true, // allow cookies
    })
);
console.log(process.env.FRONTEND_URL);
app.use(express.json());
app.use(cookieParser());

app.use("/user", publicRouter);
app.use("/user", authenticateToken, protectedRouter);
app.use("/purchase", purchaseRouter);

//Routes
app.use("/admin/service", verifyAdmin, serviceRouter);
app.use("/services", authenticateToken, clientRouter);
app.use("/orders", orderRouter);

//Fallback
app.use((req: Request, res: Response) => {
    res.status(404).json({
        error: "404 Not Found",
        message: "Page not found.",
    });
});

//Connect to MongoDb
const MONGODB_URI = process.env.DATABASE_URI!;
mongoose
    .connect(MONGODB_URI, { dbName: "daisuki" })
    .then(() => {
        console.log("Connected to MongoDB database");

        //Start server
        const PORT = process.env.PORT || 3500;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });
