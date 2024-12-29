import Admin from "../models/Admin.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const adminLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await Admin.findOne({ username });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: admin._id, username: admin.username }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export default adminLogin;