import { HotelType } from "../models/Hotel"

export type HotelSearchResponse = {
    data: HotelType[];
    pagination:{
        total:number;
        page:number;
        pages:number;
    }
}