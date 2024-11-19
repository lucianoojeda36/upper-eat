import Image from 'next/image';
import React from 'react';
import Form from './ReservationForm';

export default function ReservationsPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="w-full max-w-6xl rounded-lg border-2 border-[#F8B81C] p-8 shadow-xl  m-10">
        <h2 className="text-3xl font-bold text-[#333] text-center mb-6">
          Reservation Form
        </h2>
        <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-6 w-full items-center">
          <div className="flex-shrink-0">
            <Image
              src="/images/restaurant-reservation.png"
              alt="Restaurant Reservation"
              width={350}
              height={200}
              className="object-contain"
            />
          </div>
          <div className="flex-grow w-full">
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}
