import nodemailer from "nodemailer";
import { html } from "./user.html.js";
import Jwt from "jsonwebtoken";
import crypto from "crypto";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tarekelsaied683@gmail.com",
    pass: "fwku jemq nnhb iwfs",
  },
});

export const sendeEmail = async (options) => {
  const _JwtSecret = process.env.JWT_SECRET;

  var token = Jwt.sign({ email: options.email }, _JwtSecret);
  let info = await transporter.sendMail({
    from: '"Tarek elsayed" <tarekelsaied683@gmail.com>',
    to: options.email,
    subject: "hello Dr Nowraa!",
    html: html(token),
  });

  console.log(info);
};

export const resetPassEmail = async (options) => {
  const randomCode = crypto.randomInt(10000, 100000);

  let info = await transporter.sendMail({
    from: '"Tarek elsayed" <tarekelsaied683@gmail.com>',
    to: options.email,
    subject: "hello Dr Nowraa!",
    html: html(randomCode),
  });

  return { info, randomCode };
};
