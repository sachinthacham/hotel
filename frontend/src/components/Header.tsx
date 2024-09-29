import {Link} from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import SignOutButton from './SignoutButton';

const Header = () => {
  const {isLoggedin} = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white tracking-tight">
            <Link to="/">MernHolidays.com</Link>
        </span>
        <span className='flex space-x-2'>
            {isLoggedin ?(<>
              <Link  to="/My-booking" className='flex items-center text-white  px-3 font-bold'>My booking</Link>
              <Link to="/My-hotels" className='flex items-center text-white px-3 font-bold'>My hotels</Link>
              <SignOutButton/>
            </>):
            (<Link to='/sign-in' className='flex items-center text-blue-600 px-3 font-bold'>Sign in</Link>)
            }
        </span>
      </div>
    </div>
  )
}

export default Header
