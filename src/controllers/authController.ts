import type { Request, Response } from 'express';
import { getConnection, sql } from '../db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const login = async (req:Request, res:Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const pool = await getConnection();
        const result = await pool.request()
            .input('username', sql.VarChar, username)
            .query('SELECT * FROM Users WHERE username = @username');

        const user = result.recordset[0];

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET!,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.status(200).json(
            { message: 'Login Successful', token, user: { id: user.id, fname: user.fname, lname: user.lname, username: user.username } }
        );
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};