import React, { useState } from 'react';

interface StatusChipsProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

type Status = 'pending' | 'confirmed' | 'completed' | 'canceled' | 'default';

const statusColors: Record<
  Status,
  { border: string; bg: string; text: string }
> = {
  pending: {
    border: 'border-yellow-500',
    bg: 'bg-yellow-100',
    text: 'text-yellow-500',
  },
  confirmed: {
    border: 'border-green-500',
    bg: 'bg-green-100',
    text: 'text-green-500',
  },
  completed: {
    border: 'border-blue-500',
    bg: 'bg-blue-100',
    text: 'text-blue-500',
  },
  canceled: {
    border: 'border-red-500',
    bg: 'bg-red-100',
    text: 'text-red-500',
  },
  default: {
    border: 'border-gray-300',
    bg: 'bg-gray-200',
    text: 'text-gray-700',
  },
};

const StatusChipButton: React.FC<StatusChipsProps> = ({
  label,
  value,
  onChange,
  options,
}) => {
  const [hoveredStatus, setHoveredStatus] = useState<string | null>(null);

  const getStatusColors = (status: string) => {
    return statusColors[status as Status] || statusColors.default;
  };

  const handleMouseEnter = (status: string) => setHoveredStatus(status);
  const handleMouseLeave = () => setHoveredStatus(null);
  const handleClick = (
    status: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
    onChange(status);
  };

  return (
    <div>
      <label
        htmlFor="status"
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="flex space-x-2">
        {options.map((option) => {
          const isSelected = value.toLowerCase() === option.value.toLowerCase();
          const isHovered = hoveredStatus === option.value;
          const colors = getStatusColors(option.value);

          const backgroundClass =
            isSelected || isHovered ? colors.bg : 'bg-gray-200';
          const borderClass =
            isSelected || isHovered
              ? `${colors.border} border-2`
              : 'border-transparent';
          const textColor = isSelected ? colors.text : 'text-white';

          return (
            <button
              key={option.value}
              onClick={(e) => handleClick(option.value, e)}
              onMouseEnter={() => handleMouseEnter(option.value)}
              onMouseLeave={handleMouseLeave}
              className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none transition-all duration-200 
                ${backgroundClass} ${textColor} ${borderClass} box-border`}
              style={{
                borderWidth: '2px',
              }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StatusChipButton;
