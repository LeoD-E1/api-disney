import bcrypt from 'bcrypt';
import User from '../models/users.models';
import { checkUser } from '../querys/Users/userFindOne'
import { checkUsername } from '../querys/Users/userFindByUsername'
import { encodePassword } from '../helpers/hashPassword'
import { getToken } from '../helpers/generateToken'


export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body
    const user = await checkUser(email)
    const alias = await checkUsername(username)

    if (user || alias) {
      return res.status(409).json({
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
      return res.status(500).json({
        message: 'User was not created'
      })
    }

    res.json({
      data: newUser,
      token: getToken(newUser)
    }).status(201)

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