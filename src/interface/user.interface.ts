import { Document } from 'mongoose';

export interface UserI extends Document {
    username: string,
    email: string,
    password: string,
    encryptPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
}