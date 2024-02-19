import { userModel } from "../../../database/models/user.model.js";
import bcrypt from "bcryptjs";
import Joi from "joi";
import jwt from "jsonwebtoken";
import { sendeEmail, resetPassEmail } from "../../emails/user.email.js";
import { config } from "dotenv";
config();

const _JwtSecret = process.env.JWT_SECRET;
const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[A-z][a-z0-9]{3,30}$/)
    .required(),

  age: Joi.number().min(10).max(80),
});

function catchError(fn) {
  return (req, res, next) => {
    fn(req, res)
      .catch((err) => {
        return res.status(500).json(err);
      })
      .then();
  };
}
export const signUp = catchError(async (req, res) => {
  const { age, email, password, name } = req.body;
  let { error } = signUpSchema.validate(req.body);

  console.log(req.body);
  if (!error) {
    let user = await userModel.findOne({ email });
    if (user) {
      res.status(409).json({ message: "Email is existes befor" });
    } else {
      bcrypt.hash(password, 8, async function (err, hash) {
        await userModel.insertMany({ name, email, age, password: hash });
        sendeEmail({ email });
        res.status(200).json({ message: " success" });
      });
    }
  } else {
    res.status(422).json(error.details);
  }
});

export const verify = catchError(async (req, res) => {
  const { token } = req.params;
  Jwt.verify(token, _JwtSecret, async (err, decoded) => {
    if (err) return res.status(400).json(err);

    await userModel.findOneAndUpdate(
      { email: decoded.email },
      { confirmedEmail: true }
    );
    res.status(200).json({ message: "success" });
  });
});

/*export const signIn = catchError(async (req, res) => {
  const { email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "incorrect password or user" });
  }
  //user["password"] = undefined;
  var token = Jwt.sign({ user }, "Tarek");
  return res.status(200).json({ message: "login", token });
});*/

// Sign-in API endpoint
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//

export const resetLink = catchError(async (req, res) => {
  const { email } = req.body;
  let user = await userModel.findOne({ email });
  if (!user) return res.status(500).json("failed");
  const options = { email: user.email };
  let { randomCode, info } = await resetPassEmail(options);
  const token = Jwt.sign(
    { email, randomCode, exp: Math.floor(Date.now() / 1000) + 60 * 5 },
    _JwtSecret
  );
  res.cookie("_rc", token);
  return res.json([token, info]);
});

const resetPassSchema = Joi.object({
  password: Joi.string()
    .pattern(/^[A-z][a-z0-9]{3,30}$/)
    .required(),

  passwordCheck: Joi.ref("password"),
});

// code => body
// check token == code
//
export const codeConfirmation = catchError(async (req, res) => {
  const { code } = req.body;
  const { _rc } = req.cookies;
  if (!_rc) return res.status(400).json("no token");

  if (!code) return res.status(400).json("no code");
  Jwt.verify(_rc, _JwtSecret, async (err, decoded) => {
    if (err) return res.status(400).json(err);
    console.log(new Date(decoded.exp));
    if (code != decoded.randomCode) return res.status(400).json("wrong code");
    return res.status(200).json({ success: true, message: "correct code" });
  });
});

export const forgotPassword = catchError(async (req, res) => {
  let { error } = resetPassSchema.validate(req.body);
  if (error) return res.json(error);
  const { _rc } = req.cookies;
  const { password } = req.body;

  if (!_rc || !password) return res.status(400).json("no token");
  Jwt.verify(_rc, _JwtSecret, async (err, decoded) => {
    if (err) return res.json(err);
    let hashed = await bcrypt.hash(password, 8);
    let isUser = await userModel.findOneAndUpdate(
      { email: decoded.email },
      { password: hashed }
    );
    if (!isUser) return res.json("not user");
    res.json({ message: "success, new pass " });
  });
});
