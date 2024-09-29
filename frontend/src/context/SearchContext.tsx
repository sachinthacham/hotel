import React, { useContext, useState } from "react";

type SearchContext = {
    destination:string;
    checkIn: Date;
    checkOut:Date;
    adultCount:number;
    childCount: number;
    hotelId:string;
    saveSearchValues: (
        destination: string,
        checkIn:Date,
        checkOut: Date,
        adultCount:number,
        childCount: number,
    ) => void;
}


const SearchContext = React.createContext<SearchContext | undefined>(undefined);

type SearchContextProvider = {
    children:React.ReactNode;
}
export const SearchContextProvider = ({children}:SearchContextProvider) => {
   
   const [destination, setDestination] = useState<string>("");
   const [checkIn, setCheckIn] = useState<Date>(new Date());
   const [checkOut, setCheckOut] = useState<Date>(new Date());
   const [adultCount, setAdultCount] = useState<number>(1);
   const [childCount, setChildCount] = useState<number>(0);
   const[hotelId, setHotelId] = useState<string>("");
   
   const saveSearchValues = (
     destination:string,
     checkIn:Date,
     checkOut:Date, 
     adultCount:number, 
     childCount:number,
     hotelId?:string,
    ) => {
        setDestination(destination);
        setAdultCount(adultCount);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setChildCount(childCount);
        if(hotelId){
            setHotelId(hotelId);
        }
       
    }

    return (
        <SearchContext.Provider value={{
            destination,
            adultCount,
            checkIn,
            checkOut,
            childCount,
            hotelId,
            saveSearchValues,

        }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContext;
}
