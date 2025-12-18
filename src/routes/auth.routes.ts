

import {Router} from "express"
import {login,signup,verifyOtp} from "@controllers/auth.controller";

const router=Router()


router.post("/login",login);
router.post("/signup",signup);

router.post("/verify-otp",verifyOtp);



export default router