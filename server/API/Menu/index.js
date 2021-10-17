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
Route   |  /menu/new
Des     |  add new menu
params  |  _id
access  |  public
method  |  POST
*/
Router.post("/new", async (req, res) => {
  try {
    const { menuData } = req.body;

    if (menuData._id) {
      const updateMenu = await MenuModal.findByIdAndUpdate(
        menuData._id,
        {
          $push: {
            menus: { $each: menuData.menus },
          },
        },
        { new: true }
      );

      return res.json({ menu: updateMenu });
    }

    const createNewMenu = await MenuModal.create(menuData);

    return res.json({ menu: createNewMenu });
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