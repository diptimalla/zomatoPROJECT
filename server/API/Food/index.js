//libraries
import express from "express";
import passport from "passport";

//database model 
import { FoodModel} from "../../database/allmodels";

//validation
import { ValidateRestaurantId ,ValidateCategory } from "../../validation/food";

const Router= express.Router();

/*
Route   |  /r
Des     |  get all food details based on restaurant
params  |  id
access  |  public
method  |  GET
*/
Router.get("/r/:_id", async (req, res) => {
    try {
      await ValidateRestaurantId(req.params);

      const { _id } = req.params;
      const foods = await FoodModel.find({ restaurant: _id });
  
      return res.json({ foods });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  

  /*
Route   |  /c
Des     |  get all food details based on category
params  |  category
access  |  public
method  |  GET
*/
Router.get("/r/:category", async (req, res) => {
    try {
      await Validatecategory(req.params);

      const { category } = req.params;
      const foods = await FoodModel.find({
        category: { $regex: category, $options: "i" },
      });
  
      return res.json({ foods });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

export default Router;

