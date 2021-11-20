import { Request, Response } from 'express';
import { UserI } from '../interface/user.interface';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const secretKey: string = process.env.TOKEN_SECRET || 'tokentest'

export const signup = async(req: Request, res: Response) => {
    
    // Saving a new user
    const { username, email, password } = req.body;
    const user: UserI = new User({
        username,
        email,
        password 
    });
    user.password = await user.encryptPassword(user.password);
    const savedUser = await user.save();
    
    // Token
    const token: string = jwt.sign({_id: savedUser._id }, secretKey);

    res.header('auth-token', token).json(savedUser);
};

export const signin = async(req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'Email or password is wrong' });

    const validPassword: boolean = await user.validatePassword( password );
    if(!validPassword) return res.status(400).json({ message: 'Invalid Password' });

    const token: string = jwt.sign({ _id: user._id }, secretKey, {
        expiresIn: 60 * 60 * 24
    });

    res.header('auth-token', token).json(user);
};

export const profile = async(req: Request, res: Response) => {
    
    const userId = req.userId;
    
    const user = await User.findById(userId, { password: 0 } );

    if(!user) return res.status(404).json('No user found');
    res.json(user);
};