import { check, validationResult } from "express-validator";
import {
  VALID_EMAIL,
  VALID_USERNAME,
  VALID_PASSWORD,
  ISREQUIRED,
  MIN_CHARACTERS,
  MIN_CHARACTERS_USERNAME,
  MAX_CHARACTERS_USERNAME,
} from "../const/const";

export const validators = [
  check("email", VALID_EMAIL)
    .exists()
    .withMessage(ISREQUIRED)
    .isEmail()
    .withMessage(VALID_EMAIL),
  check("password", VALID_PASSWORD)
    .exists()
    .withMessage(ISREQUIRED)
    .isLength({ min: 8 })
    .withMessage(MIN_CHARACTERS),
  check("username", VALID_USERNAME)
    .exists()
    .withMessage(ISREQUIRED)
    .isLength({ min: 5 })
    .withMessage(MIN_CHARACTERS_USERNAME)
    .isLength({ max: 20 })
    .withMessage(MAX_CHARACTERS_USERNAME),
];

export const validationVerify = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }
  next();
};
