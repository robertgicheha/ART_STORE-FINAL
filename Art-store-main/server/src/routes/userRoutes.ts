import { Router } from "express";
import { Homepage, loginUser, RegisterUser, getallusers,deactivateuser } from "../controllers/authControllers";
import { VerifyToken } from "../middlewares/verify";



const authroute =Router()

authroute.post('/register',RegisterUser)
authroute.post('/login', loginUser)
authroute.post('/deactivateuser', deactivateuser)
authroute.get('/allusers', getallusers)
authroute.get('/home',VerifyToken, Homepage)//protected Route

export default authroute