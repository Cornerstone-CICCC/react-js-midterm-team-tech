import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import serviceRouter from './routes/serviceAdmin.route';
import orderRouter from './routes/orderClient.route';
import clientRouter from './routes/serviceClient.route';
dotenv.config();


//Create server
const app = express();

//Middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // allow cookies
  })
);
app.use(express.json());


//Routes
app.use('/admin/service', serviceRouter)
app.use('/services', clientRouter)
app.use('/orders', orderRouter)

//Fallback
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: '404 Not Found', message: 'Page not found.' });
});


//Connect to MongoDb
const MONGODB_URI = process.env.DATABASE_URI!;
mongoose
  .connect(MONGODB_URI, { dbName: 'daisuki' })
  .then(() => {
    console.log('Connected to MongoDB database');

    //Start server
    const PORT = process.env.PORT || 3500;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
