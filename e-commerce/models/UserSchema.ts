import { model, models, Schema } from 'mongoose';

const UserSchema = new Schema(
    {
        name: String,
        email: String,
        password: String
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export default models.User || model('User', UserSchema);
