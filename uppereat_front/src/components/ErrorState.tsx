import React from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';

interface ErrorStateProps {
  error: string | null;
  status: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, status }) => {
  if (status === 'failed' && error) {
    toast.error(`Error: ${error}`);

    return (
      <div className="flex justify-center items-center min-h-full max-h-full h-screen">
        <Image
          src="/images/error.png"
          alt="Error - No reservations"
          width={350}
          height={200}
          className="object-contain"
        />
      </div>
    );
  }

  return null;
};

export default ErrorState;
