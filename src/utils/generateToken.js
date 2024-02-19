import Jwt from "jsonwebtoken";

export const generatetoken = (payload) => {
  let token = Jwt.sign(payload, "myNameIsOk");
  return token;
};
