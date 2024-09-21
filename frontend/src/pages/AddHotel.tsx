import { useMutation } from 'react-query';
import { useAppContext } from '../context/AppContext'
import ManageHotelForm from '../Forms/ManageHotelForms/ManageHotelForm'
import * as apiClient from '../Api-client'

const AddHotel = () => {
  const{showToast} = useAppContext();
  const {mutate, isLoading} = useMutation(apiClient.addMyHotel,{
    onSuccess: () => {
      showToast({message:"hotel saved", type:"SUCCESS"});
    },
    onError: () => {
      showToast({message:"Error saving hotel", type:"ERROR" })
    }
  });

  const handlesave = (hotelFormData: FormData) => {
    mutate(hotelFormData)
  }
  return (
   <ManageHotelForm onSave = {handlesave} isLoading={isLoading}/>
  )
}

export default AddHotel
