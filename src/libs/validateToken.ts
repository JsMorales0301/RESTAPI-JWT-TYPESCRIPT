import { Request, Response, NextFunction } from 'express';
import { PayloadI } from 'interface/payload.interface';
import jwt from 'jsonwebtoken';

const secretKey: string = process.env.TOKEN_SECRET || 'tokentest'


export const tokenValidation = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.header('auth-token');
    if (!token) res.status(401).json('Access Denied');

    const payload = jwt.verify(token!, secretKey) as PayloadI;

    req.userId = payload._id;

    next();
}