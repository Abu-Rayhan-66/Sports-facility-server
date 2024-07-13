import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";
import { TUser } from "./user.interface";

export type TUserWithToken = TUser & {
    token: string;
  };


const createUser = catchAsync(async (req, res)=>{
 const result = await UserServices.createUserIntoDB(req.body)
 

 sendResponse(res, {
     success: true,
    statusCode:200,
    message: 'User registered successfully',
    data: {
        _id: result._id,
        name: result.name,
        email: result.email,
        phone: result.phone,
        role: result.role,
        address: result.address,
      },
 })
})


 const loginUser = catchAsync(async (req, res) => {
    const result = await UserServices.getUserFromDB(req.body);
    res.json({
      success: true,
      statusCode: 200,
      message: "User logged in successfully",
      token: result?.token,
      data: result?.result,
    });
  });

export const UserController = {
    createUser,
    loginUser
   
}