//libraries
import express from "express";
import passport from "passport";
import multer from "multer";

//database model 
import { ImageModel} from "../../database/allmodels";

//utilities
import { s3Upload } from "../../Utils/AWS/S3";

// Multer Config
const storage = multer.memoryStorage();
const upload = multer({ storage });

const Router= express.Router();

/*
Route   |  /
Des     |  Get image details
params  |  _id
access  |  public
method  |  GET
*/
Router.get("/:_id", async (req, res) => {
  try {
    const image = await ImageModel.findById(req.params._id);

    return res.json({ image });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


/*
Route   |  /image
Des     |  uploads given image to s3 bucket and saves file link to mongodb
params  |  id
access  |  public
method  |  POST
*/

Router.post("/", upload.single("file"), async (req, res) => {
    try {
      const file = req.file;
  
      //s3 bucket options
      const bucketOptions = {
        Bucket: "zomatoproject1",
        Key: file.originalname,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: "public-read" // Access Control List
      };
  
      const uploadImage = await s3Upload(bucketOptions);
  
      return res.status(200).json({ uploadImage });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  
  export default Router;
