//env variables
require("dotenv").config();

//libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";


//database connection
import ConnectDB from "./database/connection"; 

//configs
import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";

//MICROSERVICES ROUTE
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Menu from "./API/Menu";
import Image from "./API/Image";
import Order from "./API/orders";
import Reviews from "./API/reviews";
import User from "./API/User";



const zomato = express();

//application middleware
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false}))
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport config
googleAuthConfig(passport);
routeConfig(passport);

//Application Routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("./food", Food);
zomato.use("./menu", Menu);
zomato.use("./image", Image);
zomato.use("./order", Order);
zomato.use("./reviews", Reviews);
zomato.use("./user", User);


zomato.get("/" , (req,res) => res.json({message : "setup success"}));

zomato.listen(4000, () =>ConnectDB().then(() => console.log("server is running"))
.catch(() =>console.log("Server is running, but database connection failed... ")));

