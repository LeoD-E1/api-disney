import bcrypt from 'bcrypt';
import User from '../models/users.models';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await checkUser(email)
    if (!user) {
      const hashedPassword = await encodePassword(password);
      let newUser = await User.create({
        email,
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

export const login = async (req, res) => {
  const { email, password } = req.body // I recover the data from body through request
  const user = await checkUser(email) // Run checkUser to check if the user is in the database 
  if (user) {
    const matchedPassword = await bcrypt.compare(password, user.password) // If it is in the database it is verified if the passwords match
    if (matchedPassword) {
      const token = getToken(email) // If passwords match then, user get a token 
      console.log(typeof (token))
      res.send(`Welcome User ${email}`)
    } else {
      res.send('The passwords No match')
    }
  } else {
    res.send('User not exists')
  }
}
// Function to hash a password
const encodePassword = async (password) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword;
}
// Function to check a user by email
const checkUser = async (email) => {
  const user = await User.findOne({
    attributes: ['email', 'password'],
    where: {
      email
    }
  })
  return user
}
// Function to get a token from jwt
const getToken = (email) => {
  return jwt.sign({ data: email, expiresIn: '2h' }, 'secret_key')
};