import app from '../app'
import { getToken } from '../controllers/users.controllers'

const automaticLogin = (user, res) => {
    res.json({ automaticLogin: user })
}