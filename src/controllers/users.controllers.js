import bcrypt from 'bcrypt';
import User from '../models/users.models';
import { checkUser } from '../querys/Users/userFindOne'
import { encodePassword } from '../helpers/hashPassword'
import { getToken } from '../helpers/generateToken'


export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body
    const user = await checkUser(email)

    if (user) {
      return res.status(401).json({
        message: 'User already exists'
      })
    }

    const hashedPassword = await encodePassword(password);
    let newUser = await User.create({
      email,
      password: hashedPassword,
      username
    }, {
      fields: ['email', 'password', 'username']
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
    const { email, password } = req.body
    const user = await checkUser(email)

    if (!user) {
      return res.json({
        message: 'User not exists'
      }).status(404)
    }

    const matchedPassword = bcrypt.compare(password, user.password)
    if (!matchedPassword) {
      return res.json({
        message: 'The passwords No match'
      }).status(401)
    }

    const token = getToken(user)
    return res.json({
      message: `Welcome User ${email}`,
      token
    }).status(201)

  } catch (error) {
    return res.send(error).status(500)
  }
}