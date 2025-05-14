import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'jfdhuifhkewuhr';

export const authenticateToken = (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers['authorization'];
  const token = authHeader?.split(' ')[1]; // Bearer <token>

  if (!token) {
    response.status(401).json({ message: 'No token provided' });

    return
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);

    // @ts-ignore
    request.user = decoded;

    next();
  } catch (err) {
    response.status(403).json({ message: 'Invalid token' });

    return 
  }
}
