import express,{Request, Response}from "express";
import {check, validationResult} from "express-validator";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/Auth";

const router = express.Router();

//router for login function
router.post("/login",[
    //validate the request body
    check("email","Email is required").isEmail(),
    check("password","Password with 6 or more characters required").isLength({
        min:6,
    })
],async(req:Request,res:Response) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({
            message: errors.array()
        })
    }
const {email, password} = req.body;
    try{
        //check if there is an email adress in database match with the email address in request body
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message:"Invalid Credentials"
            });
        }
        //if email can be found hash the password of request body and compare it with the hashed password already existing in the database.
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message:"Invalid credentials"
            });
        }
        //Generate a token with userId, secretkey and expiring time
        const token = jwt.sign(
            {userId:user.id},
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn:"1d",
            }
        )

        res.cookie("auth_token",token,{
            httpOnly: true,
            secure: process.env.Node_ENV === "production",
            maxAge:86400000,
        })
        res.status(200).json({userId:user._id});

    }catch(error){
        console.log(error);
        res.status(500).json({message:"something went wrong"});
    }
});

router.get("/validate-token", verifyToken , (req:Request, res:Response) => {
    res.status(200).send({userId: req.userId});
});

router.post("/logout", (req:Request, res:Response) => {
    res.cookie("auth_token", "",{
        expires:new Date(0),

    });
    res.send();
})

export default router;