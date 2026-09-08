import 'dotenv/config';
import express, { Request, Response } from 'express';
import cors from 'cors';
import { getConnection } from './db';


const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies
const port = 8080;

// Define a route for GET requests to the root URL
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World from Express!');
});

app.post('/api/register', (req: Request, res: Response) => {
  res.status(201).json({ message: 'New User Created successfully', user: req.body });
});

// Start the server
// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`);
// });

async function startServer() {
  try {
    const pool = await getConnection();
    console.log('Connected to SQL Server');
    // You can now use the pool to execute queries

    //Verify the connection by executing a simple query
    const result = await pool.request().query('SELECT 1 AS number');
    console.log('Query result:', result.recordset);

  } catch (error) {
    console.error('Error connecting to SQL Server:', error);
    process.exit(1); // Exit the process with an error code
  }

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
}

startServer();
