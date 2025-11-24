import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
    path: path.join(process.cwd(), '.env'),
});

const envConfig = {
    // environments
    node_env: process.env.NODE_ENV!,
    port: Number(process.env.PORT),

    // cors
    allowed_origins: process.env.ALLOWED_ORIGINS!,

    // mongodb connection string
    mongo_uri: process.env.MONGO_URI!,

    // better auth
    better_auth_secret: process.env.BETTER_AUTH_SECRET!,
    better_auth_url: process.env.BETTER_AUTH_URL!,

    // nodemailer
    smtp_user: process.env.SMTP_USER!,
    smtp_pass: process.env.SMTP_PASS!,
    smtp_host: process.env.SMTP_HOST!,
    smtp_port: Number(process.env.SMTP_PORT),
    smtp_secure: process.env.SMTP_SECURE!,
};

export default envConfig;
