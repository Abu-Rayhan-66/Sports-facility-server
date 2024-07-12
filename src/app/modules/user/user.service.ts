
import { TUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from 'bcrypt';
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { JwtPayload } from "jsonwebtoken";
import { createToken } from "../../utils/createToken";
import config from "../../config";

const createUserIntoDB = async (payload:TUser)=>{
    const result = await User.create(payload)
    return result
}

 const getUserFromDB = async (data: {
    email: string;
    password: string;
  }) => {
    // console.log(data);
    //? check if user exists
    if (!data || !data.email || !data.password) {
      throw new AppError(httpStatus.BAD_REQUEST, "Email and password are required");
  }

  
    const user = await User.findOne({email: data.email!,}).select("+password").lean();
  
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }
    // console.log(user, "user");
    const match = await bcrypt.compare(data.password, user.password);
    // console.log(data?.password, "password", match);
  
    if (!match) {
      throw new AppError(httpStatus.NOT_FOUND, "Incorrect password");
    }
  
    const jwtPayload: JwtPayload = {
      id: user._id,
      role: user.role,
    };
    //? create a new token
    const token = createToken(jwtPayload, config.jwt_access_secret!, config.jwt_access_expire_in!);
  
    const result = await User.findById(user._id);
  
    return { token, result };
  };

export const UserServices = {
    createUserIntoDB,
    getUserFromDB
    
}