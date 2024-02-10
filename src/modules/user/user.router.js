import express from "express";
import {
  signIn,
  signUp,
  verify,
  resetLink,
  forgotPassword,
  codeConfirmation,
} from "./user.controller.js";
const userRouter = express.Router();

userRouter.post("/signUp", signUp);
userRouter.post("/signIn", signIn);
userRouter.post("/resetPasswordLink", resetLink);
userRouter.post("/code-confirmation", codeConfirmation);
userRouter.post("/resetPassword", forgotPassword);

userRouter.get("/verify/:token", verify);
export default userRouter;
