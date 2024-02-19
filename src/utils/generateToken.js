import Jwt from "jsonwebtoken";

export const generatetoken = (payload) => {
  let token = Jwt.sign(payload, process.env._JwtSecret);
  return token;
};
