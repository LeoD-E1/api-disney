import bcrypt from "bcrypt";
import User from "../../models/users.models";
import { checkUser } from "../../querys/Users/userFindOne";
import { checkUsername } from "../../querys/Users/findUserByUsername";
import { encodePassword } from "../../helpers/hashPassword";
import { getToken } from "../../helpers/generateToken";
import {
  USER_EXISTS,
  USER_NOT_CREATED,
  PASSWORD_NOT_MATCHED,
  USER_NOT_EXISTS,
  WELCOME,
} from "../../const/const";

export const register = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = await checkUser(email);
    const alias = await checkUsername(username);

    if (user || alias) {
      return res.status(409).json({
        message: USER_EXISTS,
      });
    }

    const hashedPassword = await encodePassword(password);
    let newUser = await User.create(
      {
        email,
        password: hashedPassword,
        username,
      },
      {
        fields: ["email", "password", "username"],
      }
    );

    if (!newUser) {
      return res.status(500).json({
        message: USER_NOT_CREATED,
      });
    }

    res
      .json({
        data: newUser,
        token: getToken(newUser),
      })
      .status(201);
  } catch (err) {
    return res.send(err);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await checkUser(email);

    if (!user) {
      return res.status(404).json({
        message: USER_NOT_EXISTS,
      });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({
        message: PASSWORD_NOT_MATCHED,
      });
    }
    const token = getToken(user);
    return res
      .json({
        message: `${WELCOME} ${user.username}`,
        token,
      })
      .status(201);
  } catch (error) {
    return res.send(error).status(500);
  }
};
