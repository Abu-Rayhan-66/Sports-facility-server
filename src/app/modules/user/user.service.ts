import { TUser } from "./user.interface";

import bcrypt from "bcrypt";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { JwtPayload } from "jsonwebtoken";
import { createToken } from "../../utils/createToken";
import config from "../../config";
import UserModel from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);
  return result;
};

const getUserFromDB = async (data: { email: string; password: string }) => {
  if (!data || !data.email || !data.password) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Email and password are required"
    );
  }

  const user = await UserModel.findOne({ email: data.email! })
    .select("+password")
    .lean();

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  const match = await bcrypt.compare(data.password, user.password);

  if (!match) {
    throw new AppError(httpStatus.NOT_FOUND, "Incorrect password");
  }

  const jwtPayload: JwtPayload = {
    id: user._id,
    role: user.role,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret!,
    config.jwt_access_expire_in!
  );

  const result = await UserModel.findById(user._id);

  return { token, result };
};

export const UserServices = {
  createUserIntoDB,
  getUserFromDB,
};
