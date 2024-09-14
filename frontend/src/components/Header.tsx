import {Link} from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white tracking-tight">
            <Link to="/">MernHolidays.com</Link>
        </span>
        <span>
            <Link to='/sign-in' className='flex items-center text-blue-600 px-3 font-bold'>Sign in</Link>
        </span>
      </div>
    </div>
  )
}

export default Header
