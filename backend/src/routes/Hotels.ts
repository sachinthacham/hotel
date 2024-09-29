import express, {Request, Response} from 'express'
import Hotel from '../models/Hotel';
import { HotelSearchResponse } from '../shared/Types';

const router = express.Router();

router.get("/search", async(req:Request, res:Response) => {
    try{
        const pagesize = 5;
        const pageNumber = parseInt(req.query.page? req.query.page.toString():"1")
       
        const skip = (pageNumber - 1) * pagesize
       
        const hotels = await Hotel.find().skip(skip).limit(pagesize);

        const total = await Hotel.countDocuments();

        const response: HotelSearchResponse = {
            data:hotels,
            pagination : {
                total,
                page: pageNumber,
                pages: Math.ceil(total/pagesize),
            }
        }
        res.json(response);

    }catch(error){
        console.log("error", error);
        res.status(500).json({message:"Something went wrong"});
    }
});

export default router;