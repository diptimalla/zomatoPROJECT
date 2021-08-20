//libraries
import express from "express";
import passport from "passport";

//database model 
import { ReviewModel} from "../../database/allmodels";

const Router= express.Router();

/*
Route   |  /food/new
Des     |  add new food review/rating
params  |  _userID,_foodID
access  |  public
method  |  GET
*/
Router.post("/new", async (req,res) => {
    try {
        const {reviewData } = req.body;

        await ReviewModel.create(reviewData);
     
        return res.json({ review: "Sucessfully created Review" });


    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});

/*
Route   |  /delete
Des     |  add new food review/rating
params  |  _id
access  |  public
method  |  DELETE
*/
Router.delete("/delete/:_id", async (req,res) => {
    try {
        const { _id } = req.params;
    
        await ReviewModel.findByIdAndDelete(_id);
    
        return res.json({ review: "Sucessfully Deleted the Review" });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
});


export default Router;