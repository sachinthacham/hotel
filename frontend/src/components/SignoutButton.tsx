import { useMutation, useQueryClient } from "react-query"
import * as apiClient from '../Api-client'
import { useAppContext } from "../context/AppContext"

const SignoutButton = () => {

    const queryClient = useQueryClient();

    const {showToast} = useAppContext();

    const mutation = useMutation(apiClient.signOut,{
        onSuccess: async () => {
            //show toast
            await queryClient.invalidateQueries("validateToken")
            showToast({message:"Signed out",type:"SUCCESS"});
        },
        onError:(error:Error) => {
            //show toast
            showToast({message:error.message, type:"ERROR"});
        },
    });

    const handleClick = () => {
        mutation.mutate();
    }
  return (
    <button onClick={handleClick}className='text-blue-600 px-3 font-bold bg-white  hover:bg-gray-100 '>
        Sign Out
    </button>
  )
}

export default SignoutButton
