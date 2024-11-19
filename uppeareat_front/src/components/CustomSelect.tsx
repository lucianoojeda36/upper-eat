import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="rounded-lg border-2 border-[#F8B81C] p-2  w-48">
      <div ref={selectRef} className="relative w-full">
        <button
          className="w-full p-2 text-gray-700 border bg-white border-gray-300 rounded flex items-center justify-between"
          onClick={() => setIsOpen(!isOpen)}
        >
          {value
            ? options.find((opt) => opt.value === value)?.label
            : 'All Statuses'}
          <FaChevronDown className="ml-2 text-gray-500" />
        </button>
        {isOpen && (
          <ul className="absolute left-0 mt-1 w-full border bg-white border-gray-300 rounded shadow-lg z-10">
            {options.map((option) => (
              <li
                key={option.value}
                className="p-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CustomSelect;
