import express, {Request,Response} from 'express';
import multer from 'multer';
import cloudinary from "cloudinary";
import Hotel from '../models/Hotel';
import {HotelType} from '../shared/Types';
import verifyToken from '../middleware/Auth';
import {body} from 'express-validator';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
})

// api/my-hotels
router.post("/",verifyToken,[
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("city is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description  is required"),
    body("type").notEmpty().withMessage("CoHotel type is required"),
    body("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Hotel type is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("facilities are required"),
    
],upload.array("imageFiles", 6), async(req:Request, res:Response) => {
    try{
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel:HotelType = req.body;
        

        //1.upload the image to cloudinary
        const imageUrls = await uploadImages(imageFiles);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;


        //3.save the hotel in our database
        const hotel = new Hotel(newHotel);
        await hotel.save();

        //4.return a 201 status
        res.status(201).send(hotel);

    }catch(e){
        console.log("Error creating hotel: ", e);
        res.status(500).json({
            message:"something went wrong"
        });
    }
})

//to get all hotels
router.get("/", verifyToken, async(req:Request, res:Response) => {
    try{
        const hotels = await Hotel.find({userId: req.userId});
        res.json(hotels);

    }catch(error){
        res.status(500).json({message:"Error fetching hotels"});
    }
});

//hotel get by Id
router.get("/:id", verifyToken,async(req:Request, res:Response) => {
    const id = req.params.id.toString();
    try{
        const hotel = await Hotel.findOne({
            _id: id,
            userId:req.userId
        });
        res.json(hotel);
    }catch(error){
        res.status(500).json({message:"Error fetching hotels"});
    }
})

//edit hotel
router.put("/:hotelId",
verifyToken, 
upload.array("imageFiles"),
async(req:Request, res:Response) => {
    try{
        const updatedHotel: HotelType = req.body;
        updatedHotel.lastUpdated = new Date();

        const hotel = await Hotel.findByIdAndUpdate({
            _id:req.params.hotelId,
            userId: req.userId,
        },updatedHotel,{new:true});

        if(!hotel){
            return res.status(400).json({message:"Hotel not found"});
        };

        const files = req.files as Express.Multer.File[];
        const updatedImageUrls =await uploadImages(files);

        hotel.imageUrls = [...updatedImageUrls, ...(updatedHotel.imageUrls || []),];
        await hotel.save();
        res.status(201).json(hotel)
    }catch(error){
        res.status(500).json({message:"something went throw"});
    }
}
)

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const upoladPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    //2.if upload was successful, add the URL s to the new hotel
    const imageUrls = await Promise.all(upoladPromises);
    return imageUrls;
}

export default router;
