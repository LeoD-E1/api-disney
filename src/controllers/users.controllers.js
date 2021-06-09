import bcrypt from 'bcrypt';
import User from '../models/users.models';

require('dotenv').config()

export const register = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await checkUser(email)

    if (user) {
      return res.status(401).json({
        message: 'User already exists'
      })
    }

    const hashedPassword = await encodePassword(password);
    let newUser = await User.create({
      email,
      password: hashedPassword
    }, {
      fields: ['email', 'password']
    });

    if (!newUser) {
      return res.json({
        message: 'User was not created'
      })
    }

    res.json({
      data: newUser,
      token: getToken(newUser)
    }).status(200)

  } catch (err) {
    return res.send(err)
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body// I recover the data from body through request
    const user = await checkUser(email) // Run checkUser to check if the user is in the database 
    if (user) {
      const matchedPassword = bcrypt.compare(password, user.password) // If it is in the database it is verified if the passwords match
      if (matchedPassword) {
        const token = getToken(user) // If passwords match then, user get a token 
        return res.json({
          message: `Welcome User ${email}`,
          token
        });

      } else {
        return res.json({ message: 'The passwords No match' })
      }
    } else {
      return res.json({ message: 'User not exists' })
    }
  } catch (error) {
    return error
  }
}

