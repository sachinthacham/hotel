import {useParams} from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import * as apiClient from '../Api-client';
import ManageHotelForm from "../Forms/ManageHotelForms/ManageHotelForm";

const EditHotel = () => {
  const {hotelId} = useParams();
  const {data: hotel} = useQuery("fetchMyHotelById", () => 
    apiClient.fetchMyHotelById(hotelId || ''), {
      enabled:!!hotelId,
    }
  );

  const {mutate,isLoading} = useMutation(apiClient.updatedmyHotelById,{
    onSuccess:() => {},
    onError: () => {}
  });

  const handleSave = (hotelFormData:FormData) => {
    mutate(hotelFormData);
  }

  return (
   <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading} />
  )
}

export default EditHotel
