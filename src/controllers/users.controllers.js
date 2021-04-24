import bcrypt from 'bcrypt';
import User from '../models/users.models'

export const register = async (req, res) => {
    try {
        const { email, password } = req.body
        const hashedPassword = await encodePassword(password);
        let newUser = await User.create({
            email: email,
            password: hashedPassword
        }, {
            fields: ['email', 'password']
        })

        if (newUser) {
            res.json({ newUser })
        } else {
            res.send('User was not created ')
        }
    } catch (err) {
        console.log(err)
    }

}

export const login = () => {

}

const encodePassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword;
}
