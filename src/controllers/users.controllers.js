import bcrypt from 'bcrypt';
import User from '../models/users.models'

export const register = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await checkUser(email)
    if (!user) {
      const hashedPassword = await encodePassword(password);
      let newUser = await User.create({
        email: email,
        password: hashedPassword
      }, {
        fields: ['email', 'password']
      });

      if (newUser) {
        res.json({ data: newUser }).status(200)
      } else {
        res.send('User was not created ')
      }
    } else {
      res.send('User already exists')
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

const checkUser = async (email) => {
  const user = await User.findOne({
    where: {
      email
    }
  })
  return user
}
