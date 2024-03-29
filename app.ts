import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/users", require('./api/user'));
app.use("/api/v1/cars", require('./api/car'));
app.use("/api/v1/upload", require("./api/upload"));

export default app;
