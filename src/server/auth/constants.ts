import dotenv from "dotenv";
dotenv.config();

export const jwtConstants = {
  secret: process.env.KJSP_JWT_SECRET_KEY,
};