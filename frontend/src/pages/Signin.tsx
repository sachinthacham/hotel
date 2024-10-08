import {useForm} from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../Api-client'
import { useAppContext } from "../context/AppContext";

import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email:string;
    password:string;
}

const Signin = () => {
    const {showToast} = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const {register, formState:{errors},handleSubmit} = useForm<SignInFormData>();
  
    const mutation = useMutation(apiClient.signIn,{
        onSuccess:async () => {
           showToast({message:"signed in successful", type:"SUCCESS"});
           await queryClient.invalidateQueries("validateToken");
           navigate("/")
        //1.show the toast
            //2.navigate to the home page
        },
        onError: (error:Error) => {
           
            showToast({message:error.message, type:"ERROR"})
            
        }
    });

    const onSubmit = handleSubmit ((data) => {
        mutation.mutate(data);
    })
  
  
  
    return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold"></h2>
        <label className="text-gray-700 text-sm font-bold flex-1">Email
            <input
             type="email"
             className="border rounded w-full py-1 px-2 font-normal"
             {...register("email",{required:"This field is required"})}></input>
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
            )}
    </label>
    <label className="text-gray-700 text-sm font-bold flex-1">Password
            <input
             
             className="border rounded w-full py-1 px-2 font-normal"
             {...register("password",{required:"This field is required",minLength:{value:6, message:"password must be at least 6 characters "}})}></input>
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
    </label>
    <span className="flex items-center justify-between">
       <span className="text-sm">
              Not Registered? <Link to="/register">Create an account here</Link>
       </span>

        <button  type="submit" className="bg-blue-500 text-white p-2 font-bold hover:bg-blue-500 text-xl">Log in</button>
    </span>
    </form>
  )
}

export default Signin
