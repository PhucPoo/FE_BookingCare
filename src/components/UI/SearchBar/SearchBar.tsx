import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', query);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full ">
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
    </form>
  );
};

export default SearchBar;
