//libraries
import express from "express";
import passport from "passport";

//database model 
import { MenuModel , ImageModel} from "../../database/allmodels";

const Router= express.Router();

/*
Route   |  /list
Des     |  get all list menu based on id
params  |  _id
access  |  public
method  |  GET
*/
Router.get("/list/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      const menus = await MenuModel.findOne(_id);
  
      return res.json({ menus });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  /*
Route   |  /image
Des     |  get all menu images based on id
params  |  _id
access  |  public
method  |  GET
*/
Router.get("/image/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      const menus = await ImageModel.findOne(_id);
  
      return res.json({ menus });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });

  export default Router;