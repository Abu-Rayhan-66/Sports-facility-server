import  Express  from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";

const router = Express.Router()

router.post("/signup", validateRequest(UserValidation.createUserValidationSchema), UserController.createUser)
router.post("/login", validateRequest(UserValidation.loginUserValidationSchema), UserController.loginUser )

export const UserRoutes = router;