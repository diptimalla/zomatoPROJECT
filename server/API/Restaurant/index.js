//libraries
import express from "express";
import passport from "passport";

//database model 
import { RestaurantModel} from "../../database/allmodels";

// validation
import {ValidateRestaurantCity, ValidateRestaurantSearchString,} from "../../validation/restaurant";
import { ValidateRestaurantId } from "../../validation/food";


const Router= express.Router();

/*
Route   |  /
Des     |  get all restaurant details based on city
params  |  none
access  |  public
method  |  GET
*/
Router.get("/", async (req, res) => {
   try {
    await ValidateRestaurantCity(req.query);

     const { city } = req.query;
     const restaurants = await RestaurantModel.find({ city });

     return res.json({ restaurants });

   } catch (error) {
     return res.status(500).json({ error: error.message });
   }
 });


 /*
Route   |  /
Des     |  get individual restaurant details based on id
params  |  id
access  |  public
method  |  GET
*/
 
Router.get("/:_id", async (req, res) => {
   try {
    await ValidateRestaurantId(req.params);


     const { _id } = req.params;
     const restaurant = await RestaurantModel.findOne(_id);
     if (!restaurant)
     return res.status(404).json({ error: "Restaurant Not Found" });
 
     return res.json({ restaurant });

   } catch (error) {
     return res.status(500).json({ error: error.message });
   }
 });
 
 /*
Route   |  /restaurants/new
Des     |  add new restaurant
params  |  none
access  |  public
method  |  POST
*/
Router.post("/new", passport.authenticate("jwt"), async (req, res) => {
  try {
    const newRetaurant = await RestaurantModel.create(req.body.restaurantData);
    return res.json({ restaurants: newRetaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


/*
Route   |  PATCH /restaurants/update
Des     |  update exisitng restaurant data
params  |  none
access  |  Private
method  |  Patch
*/
Router.patch("/update", passport.authenticate("jwt"), async (req, res) => {
  try {
    const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(
      req.body.retaurantData._id,
      { $set: req.body.retaurantData },
      { new: true }
    );
    if (!updatedRestaurant)
      return res.status(404).json({ restaurants: "Restaurant Not Found!!!" });

    return res.json({ restaurants: updatedRestaurant });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


 /*
Route   |  /search
Des     |  get  restaurant details based on searchs tring
params  |  none
body    |  searchString
access  |  public
method  |  GET
*/
Router.get("/search", async (req, res) => {
   try {
    await ValidateRestaurantSearchString(req.body);

     const { searchString } = req.body;
 
     const restaurants = await RestaurantModel.find({
       name: { $regex: searchString, $options: "i" },});
     if (!restaurants)
       return res.status(404).json({ error: `No Restaurant matched with ${searchString}` });
 
     return res.json({ restaurants });

   } catch (error) {
     return res.status(500).json({ error: error.message });
   }
 });

export default Router;