import { useState } from "react";
import { useSearchContext } from "../context/SearchContext"

const SearchBar = () => {

    const search = useSearchContext();
    const [destination, setDeastination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);


  return (
    <div>
      
    </div>
  )
}

export default SearchBar
