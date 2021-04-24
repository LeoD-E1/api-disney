import bcrypt from 'bcrypt';
import User from '../models/users.models'

export const register = (req, res) => {
    const { email, password } = req.body
    res.json({ email, password });
}

export const login = () => {

}

const encodePassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword;
}
