import 'dotenv/config';
import app from './index';
import { getConnection } from './db';

const port = process.env.PORT || 8080;

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