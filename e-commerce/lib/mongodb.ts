import { connect } from 'mongoose';

export const connectDB = async () => {
    try {
        const db = await connect(process.env.MONGODB_URI || 'monodb://localhost/geeko');
        console.log('DB connected to', db.connection.name);
    } catch (error) {
        console.log(error);
    }
};
