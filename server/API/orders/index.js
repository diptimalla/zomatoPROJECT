//libraries
import express from "express";
import passport from "passport";

//database model 
import { OrderModel} from "../../database/allmodels";

const Router= express.Router();

/*
Route   |  /
Des     |  get all orders based on id
params  |  _id
access  |  public
method  |  GET
*/
Router.get("/:id", passport.authenticate("jwt" , {session :false}),async(req,res) => {
    try {
        const {_id}=req.params;

        const getOrders = await OrderModel.findOne({ user:_id});

        if (!getOrders) {
            return res.status(404).json({ error: "user not found" });
        }

        return res.status(200).json({ orders: getOrders });


    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});


/*
Route   |  /new
Des     |  add new order
params  |  _id
access  |  public
method  |  POST
*/
Router.get("/new/:_id", async(req,res) => {
 try {
    const {_id}=req.params;
    const {orderDetails} =req.body;

    const addNewOrder= await OrderModel.findOneAndUpdate(
        {
          user: _id,
        },
        {
            $push: {orderDetails},
        },
        {
            new:true
        }
    );
 } catch (error) {
    return res.status(500).json({ error: error.message });

 }
});


export default Router;