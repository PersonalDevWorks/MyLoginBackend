import sql, { ConnectionPool, config as SqlConfig } from 'mssql';

function readEnvVariable(name: string): string {
    const value = process.env[name];
    console.log(`Environment variable ${name}: ${value}`); // Log the value of the environment variable
    if (!value) {
        throw new Error(`Environment variable not set: ${name}`);
    }
    return value;
}

const config: SqlConfig = {
    user: readEnvVariable('DB_USER'),
    password: readEnvVariable('DB_PASSWORD'),
    server: readEnvVariable('DB_SERVER'),
    database: readEnvVariable('DB_NAME'),
    options: {
        encrypt: true, // Use encryption if required by your SQL Server configuration
        trustServerCertificate: true // Set to true if using a self-signed certificate
    }
};

let pool: ConnectionPool | null = null;

export async function getConnection(): Promise<ConnectionPool> {
    if (pool) return pool;
    try {
        pool = await new sql.ConnectionPool(config).connect();
        console.log('Connected to SQL Server');
        return pool;
    } catch (error) {
        console.error('Error connecting to SQL Server:', error);
        throw error;
    } finally {
        // sql.close(); // Close the connection if needed
    }
}

export {sql};