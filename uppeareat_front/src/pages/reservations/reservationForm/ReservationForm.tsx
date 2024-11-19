import React, { useState } from 'react';
import InputWithLabel from '@/components/InputWithLabel';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux';
import ConfirmationModal from '@/components/ConfirmationModal';
import { toast } from 'react-toastify';
import { capitalize } from '@/utils/capitalize';
import { createReservation } from '@/redux/reservationsSlice';

const ReservationForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState('');
  const [startDate, setStartDateInput] = useState<string | null>(null);
  const [startTime, setStartTimeInput] = useState<string | null>(null);

  const combineDateAndTime = (date: string | null, time: string | null) => {
    if (!date || !time) {
      return null;
    }
    return `${date} ${time}`;
  };

  const date = combineDateAndTime(startDate, startTime);
  const status = 'pending';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error('Name is required.');
      return;
    }
    if (/\d/.test(name)) {
      toast.error('Name should not contain numbers.');
      return;
    }

    const validNumberOfPeople = parseInt(numberOfPeople);
    if (isNaN(validNumberOfPeople) || validNumberOfPeople <= 0) {
      toast.error('Please enter a valid number of people.');
      return;
    }

    if (!startDate || !startTime) {
      toast.error('Please fill in all fields before submitting.');
      return;
    }

    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    const validNumberOfPeople = parseInt(numberOfPeople) || 0;

    try {
      dispatch(
        createReservation({
          name,
          status,
          date,
          numberOfPeople: validNumberOfPeople,
        }),
      );
      toast.success('Reservation created successfully!');

      setName('');
      setNumberOfPeople('');
      setStartDateInput(null);
      setStartTimeInput(null);
      setIsModalOpen(false);
    } catch (error) {
      toast.error('Failed to create reservation. Please try again.');
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 w-full max-w-lg mx-auto"
      >
        <div className="grid grid-cols-1 gap-4">
          <InputWithLabel
            type="text"
            placeholder="Enter customer name"
            label="Name"
            value={capitalize(name)}
            onChange={(e) => setName(e.target.value)}
          />
          <InputWithLabel
            type="number"
            placeholder="Enter number of persons"
            label="Number of persons"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
          />
          <InputWithLabel
            type="date"
            label="Reservation Date"
            value={startDate || ''}
            onChange={(e) => setStartDateInput(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
          <InputWithLabel
            type="time"
            label="Reservation Time"
            value={startTime || ''}
            onChange={(e) => setStartTimeInput(e.target.value)}
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Apply Reserve
          </button>
        </div>
      </form>
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Changes"
        onClose={() => setIsModalOpen(false)}
      >
        <p>Are you sure you want to apply these reserve?</p>
        <div className="flex justify-end space-x-3 mt-20">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Confirm
          </button>
        </div>
      </ConfirmationModal>
    </div>
  );
};

export default ReservationForm;
