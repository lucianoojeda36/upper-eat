import React from 'react';

interface InputWithLabelProps {
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  min?: string;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  type = 'text',
  placeholder,
  label,
  onChange,
  value,
  min,
}) => {
  const inputId = `${label.toLowerCase().replace(/\s+/g, '-')}-input`;

  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={inputId} className="text-gray-700 font-medium">
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        min={min}
        className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      />
    </div>
  );
};

export default InputWithLabel;
