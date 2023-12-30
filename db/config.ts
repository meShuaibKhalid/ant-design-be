import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dataBaseConfig = () => {
    mongoose.connect(process.env.MONGO_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions).then(() => {
        console.log("Connected to the database");
    }).catch((error) => {
        console.error("Error connecting to the database:", error);
    });
};

export default dataBaseConfig;
