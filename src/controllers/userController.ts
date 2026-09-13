import type { Request, Response } from 'express';
import { getConnection, sql } from '../db';
import bcrypt from 'bcrypt';

//sample controller function to handle GET requests for all users
export const getAllUsers = (req: Request, res: Response) => {
    // Logic to fetch all users from the database or any data source
    const users = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
    ];
    res.status(200).json(users);
}

export const createUser = async (req: Request, res: Response) => {
    // Logic to create a new user in the database or any data source
    try {
        const { fname, lname, username, password } = req.body;

        if (!fname || !lname || !username || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with a salt round of 10

        const pool = await getConnection();

        const result = await pool.request()
            .input('fname', sql.VarChar, fname)
            .input('lname', sql.VarChar, lname)
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, hashedPassword)
            .query('INSERT INTO Users (fname, lname, username, password) OUTPUT INSERTED.* VALUES (@fname, @lname, @username, @password)');

        const newUser = result.recordset[0];
        res.status(201).json({ message: 'User created successfully', user: newUser });
    }catch (error){
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}