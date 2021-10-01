import jwt from "jsonwebtoken";
import { NO_CREDENTIALS, ERROR } from "../const/const";
import User from "../models/users.models";
import { checkUser } from "../querys/Users/userFindOne";

require("dotenv").config();

export default async function authToken(req, res, next) {
  const authHeader = await req.headers.authorization;
  const token = (await authHeader) && authHeader.split(" ")[1];

  if (!token) {
    res.status(403).json({
      message: NO_CREDENTIALS,
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
    if (err) return res.status(401).json({ message: ERROR });

    const userToken = await checkUser(user.email);
    if (!userToken) return res.status(401).json({ message: NO_CREDENTIALS });
    console.log(user);

    return userToken;
  });
}
