import { connect } from 'mongoose';
import envConfig from './config/env.js';
import { createServer } from 'http';
import app from './app.js';

async function Server() {
    try {
        await connect(envConfig.mongo_uri);

        const server = createServer(app);

        server.listen(envConfig.port, () => {
            console.log(
                `Server is listening the port: http://localhost:${envConfig.port}`
            );
        });

        console.log("Connected to database successfully.")
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

Server();
