import { useQuery } from 'react-query';
import {Link} from 'react-router-dom';
import * as apiClient from '../Api-client';



const MyHotels = () => {
    const {data: hotelData} = useQuery("fetchMyHotels",apiClient.fetchMyHotels,{
        onError: () => {
            
        }
    });

    if(!hotelData){
        return <span>No Hotels Found</span>
    }
  return (
    <div className="space-y-5">
      <span className='flex justify-between'>
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link to="/add-hotel" className='flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500'>
        Add Hotel
        </Link>
      </span>
      <div className='grid grid-cols-1'>
        {hotelData.map((hotel, i) => (
            <div key={i} className='flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5'>
                <h2 className='text-2xl font-bold'>{hotel.name}</h2>
                <div className='whitespace-pre-line'>{hotel.description}</div>
                <div className='grid grid-cols-5 gap-2'>
                     <div className='mr-1'>icon</div>
                    <div className='border border-slate-300 rounded-sm p-3 flex items-center '>{hotel.city}, {hotel.country}</div>
                </div>
                <div className='grid grid-cols-5 gap-2'>
                     <div className='mr-1'>icon</div>
                    <div className='border border-slate-300 rounded-sm p-3 flex items-center '>{hotel.pricePerNight} per night</div>
                </div>
                <div className='grid grid-cols-5 gap-2'>
                     <div className='mr-1'>icon</div>
                    <div className='border border-slate-300 rounded-sm p-3 flex items-center '>{hotel.adultCount} adults,{hotel.childCount} children</div>
                </div>
                <div className='grid grid-cols-5 gap-2'>
                     <div className='mr-1'>icon</div>
                    <div className='border border-slate-300 rounded-sm p-3 flex items-center '>{hotel.starRating} star rating</div>
                </div>
                <span className='flex justify-end'>
                    <Link to={`/edit-hotel/${hotel._id}`} className='flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500'>View Details</Link>
                </span>
            </div>
      ))}
      </div>
    </div>
  )
}

export default MyHotels
