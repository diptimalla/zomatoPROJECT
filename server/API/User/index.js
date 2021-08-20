//libraries
import express from "express";
import passport from "passport";

//database model 
import { ReviewModel} from "../../database/allmodels";

const Router= express.Router();

/*
Route   |  /:_id
Des     |  get user data
params  |  _id
access  |  public
method  |  GET
*/
Router.get("/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      const getUser = await UserModel.findById(_id);
  
      return res.json({ user: getUser });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

/*
Route   |  /update
Des     |  update user id
params  |  _id
Body    |  user data
access  |  public
method  |  PUT
*/
Router.put("/update/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const { userData } = req.body;
      const updateUserData = await UserModel.findByIdAndUpdate(
        userId,
        {
          $set: userData,
        },
        { new: true }
      );
  
      return res.json({ user: updateUserData });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  
export default Router;