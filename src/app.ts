import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { apiRouter } from './router/api.router';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const { PORT } = process.env;

app.listen(PORT, async () => {
    console.log(`Server has started on port ${PORT}!!!`);
    try {
        const connection = await createConnection();
        if (connection) {
            console.log('DB connected');
        }
    } catch (e: any) {
        console.log(e.message);
    }
});
