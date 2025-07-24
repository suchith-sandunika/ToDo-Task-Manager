import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { setDbConnection } from './src/config/dbConnection.js';
import taskRoute from "./src/routes/taskRoute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors('*'));
app.use(express.json());

app.use('/api/v1/tasks', taskRoute);

setDbConnection();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});