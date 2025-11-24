import express, {
    json,
    type Application,
    type Request,
    type Response,
} from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import envConfig from './config/env.js';

const app: Application = express();

app.use(
    cors({
        origin: [envConfig.allowed_origins],
        credentials: true,
    })
);

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(json());

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!');
});

export default app;
