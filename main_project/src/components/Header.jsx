import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom'; // add useNavigate
import avatar from '../assets/avatar.webp';
import SERVER_URL from '../services/serverUrl';

const Header = () => {
  const [profileImage, setProfileImage] = useState(avatar);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user?.profilePic) {
      setProfileImage(`${SERVER_URL}/uploads/${user.profilePic}`);
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?term=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Elite</span>
            <span className='text-slate-700'>Estate</span>
          </h1>
        </Link>

        {/* Search Bar */}
        <form
          onSubmit={handleSearch}
          className='bg-slate-100 p-3 rounded-lg flex items-center'
        >
          <input
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='bg-transparent focus:outline-none w-24 sm:w-64'
          />
          <button type='submit'>
            <FaSearch className='text-slate-600' />
          </button>
        </form>

        {/* Navigation */}
        <ul className='flex gap-4 items-center'>
          <Link to='/'><li className='hidden sm:inline text-slate-700 hover:underline'>Home</li></Link>
          <Link to='/about'><li className='hidden sm:inline text-slate-700 hover:underline'>About</li></Link>
          <Link to='/sign-in'><li className='hidden sm:inline text-slate-700 hover:underline'>Sign in</li></Link>
          <Link to='/profile'>
            <img className='rounded-full h-7 w-7 object-cover' src={profileImage} alt='profile' />
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;
