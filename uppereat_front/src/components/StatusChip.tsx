import React from 'react';

const statusColors: Record<
  string,
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

interface StatusChipProps {
  status: string;
}

const StatusChip: React.FC<StatusChipProps> = ({ status }) => {
  const { border, bg, text } = statusColors[status] || statusColors.default;

  return (
    <div
      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold border ${border} ${bg} ${text} w-48 min-w-32 max-w-full`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};

export default StatusChip;
