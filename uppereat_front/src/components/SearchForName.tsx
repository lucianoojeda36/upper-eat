import React, { useState } from 'react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (searchTerm: string) => void;
  defaultValue?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder, onSearch }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleSearch = () => {
    onSearch(inputValue);
  };

  return (
    <div className="flex items-center rounded-lg border-2 border-[#F8B81C] p-2 w-96">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder || 'Search...'}
        className="p-2 w-full rounded-l-lg focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 transition-all"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
