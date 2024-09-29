import {RegisterFormData} from "./pages/Register";
import { SignInFormData } from "./pages/Signin";
import {HotelType} from '../../backend/src/shared/Types'


//API base url
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


//API for user Registration
export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`,{
        method: 'POST',
        credentials:"include",
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if(!responseBody.ok){
        throw new Error(responseBody.message);
    }
}

//API for user sign in
export const signIn = async (formData:SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-Type": "application/json"
        },
        body:JSON.stringify(formData)
    })
    const body = await response.json();
    if(!response.ok){
        throw new Error(body.message)
    }
    return body;
}

//API for validating json web token(JWT)
export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials:"include",
    })
    if(!response.ok){
        throw new Error("Token invalid");
    }
return response.json();
};

//API for sign out
export const signOut = async () => {
        const response = await fetch(`${API_BASE_URL}/api/auth/logout`,{
            credentials:"include",
            method: "POST",
        });

        if(!response.ok){
            throw new Error("Error during sign out");
        }
}

export const addMyHotel = async (hotelFormData:FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
        method: "POST",
        credentials:"include",
        body:hotelFormData,

    });

    if(!response.ok){
        throw new Error("failedd to add hotel");
    }
    return response.json();
}


// fetch all hotels
export const fetchMyHotels =async():Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`,{
        credentials: "include",
    });
    if(!response.ok){
        throw new Error("Error fetching hotels");
    }
    return response.json();
}

// fetch hotel by id
export const fetchMyHotelById = async(hotelId:string):Promise<HotelType> =>  {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
        credentials: "include",
    });

    if(!response.ok){
        throw new Error("Error fetching Hotels");
    }

    return response.json();

}

export const updatedmyHotelById = async(hotelFormData: FormData) => {
    const response = await fetch(
        `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,{
            method:"PUT",
            body:hotelFormData,
            credentials: "include"
        }
    );
    if(!response.ok){
        throw new Error("Failed to update hotel ");
    }

    return response.json();
}