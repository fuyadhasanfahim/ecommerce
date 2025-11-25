import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { client } from './db.js';
import { sendMail } from './nodemailer.js';
import envConfig from '../config/env.js';

export const auth = betterAuth({
    secret: envConfig.better_auth_secret,
    database: mongodbAdapter((await client()).db('ecommerce-dev'), {
        client: await client(),
    }),
    user: {
        additionalFields: {
            role: {
                type: 'string',
                required: false,
                defaultValue: 'stuff',
            },
            theme: {
                type: 'string',
                required: false,
                defaultValue: 'system',
            },
        },
    },
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
        createSessionOnSignUp: true,
        autoSignIn: true,
    },
    emailVerification: {
        sendOnSignUp: true,

        async sendVerificationEmail({ url, user }) {
            await sendMail({
                to: user.email,
                subject: 'Verify Your Email',
                body: `<h1>Hello</h1><p>Please verify your email: <a href="${url}">Click Here</a></p>`,
            });
        },
    },
    trustedOrigins: [envConfig.allowed_origins],
    cookie: {
        sameSite: 'lax',
        path: '/',
    },
});
