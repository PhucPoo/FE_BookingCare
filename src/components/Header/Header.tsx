import React from 'react';
import { FaChevronDown, FaUserCircle } from 'react-icons/fa';
import SearchBar from '../UI/SearchBar/SearchBar';

const Header = () => {
  return (
    <header className="w-full h-20 bg-white shadow-sm flex items-center justify-between px-10 ">
      <div className='w-1/3'>
        <SearchBar />
      </div>
      <div className="flex items-center gap-4">
        
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-90">
          <img
            src="https://i.pravatar.cc/300?img=8"
            alt="User avatar"
            className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500"
          />
          <span className="font-medium text-gray-700">PhucPoo</span>
          <FaChevronDown className="text-gray-500 text-sm mt-0.5" />
        </div>
      </div>
    </header>
  );
};

export default Header;
