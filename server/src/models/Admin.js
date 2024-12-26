import mongoose from 'mongoose';

const { Schema } = mongoose;

const AdminSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;
