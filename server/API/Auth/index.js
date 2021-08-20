import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";

//Models
import {UserModel} from "../../database/user"

//validation
import { ValidateSignup ,ValidateSignin } from "../../validation/auth";

const Router = express.Router();

/*
Route   |  /signup
Des     |  signup with email and password
params  |  none
access  |  public
method  |  post
*/
Router.post("/signup",async (req,res) => {
    try{  
    await ValidateSignup(req.body.credentials);

     //to check whether email exist
     await UserModel.findByEmailAndPhone(req.body.credentials);
      //saving to database
     const newUser= await UserModel.create(req.body.credentials );
  
      //generate JWT auth token
      const token = newUser.generateJwtToken();
  
      //return 
      return res.status(200).json({token, status:"success"});
  
    }catch (error){
        return res.status(500).json({ error:error.message});
    }
  });

  /*
Route   |  /signin
Des     |  signin with email and password
params  |  none
access  |  public
method  |  post
*/
Router.post("/signin", async (req, res) => {
    try {
      await ValidateSignin(req.body.credentials);

      const user = await UserModel.findByEmailAndPassword(req.body.credentials);
  
      const token = user.generateJwtToken();
      return res.status(200).json({ token, status: "success" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  /*
Route   |  /google
Des     |  google signin
params  |  none
access  |  public
method  |  GET
*/
Router.get("/google",passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  })
);

/*
Route   |  /google/callback
Des     |  google signin callback
params  |  none
access  |  public
method  |  GET
*/
Router.get("/google/callback",passport.authenticate("google", { failureRedirect: "/" }),(req, res) => {
    return res.json({ token: req.session.passport.user.token });
  }
);


export default Router;
