import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux';
import InputWithLabel from '@/components/InputWithLabel';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import ConfirmationModal from '@/components/ConfirmationModal';
import StatusChips from '@/components/StatusChipButton';
import {
  fetchReservationForId,
  updateReservation,
} from '@/redux/reservationsSlice';

const EditReservationForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState({
    name: '',
    status: 'Pending',
    numberOfPeople: 1,
    date: '',
    time: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    (async () => {
      try {
        const result = await dispatch(
          fetchReservationForId(id as string),
        ).unwrap();
        if (result) {
          const dateObj = new Date(Number(result.date));
          const date = dateObj.toISOString().split('T')[0];
          const time = dateObj.toISOString().split('T')[1].split('.')[0];
          setReservation({ ...result, date, time });
        } else {
          console.error('No reservation data found');
        }
      } catch (error) {
        console.error('Error fetching reservation:', error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, dispatch]);

  const handleChange = useCallback((field: string, value: any) => {
    setReservation((prev) => ({ ...prev, [field]: value }));
  }, []);

  const validateFields = () => {
    if (/^\d+$/.test(reservation.name)) {
      toast.error('Name cannot be a number');
      return false;
    }
    if (!reservation.name.trim()) {
      toast.error('Name is required');
      return false;
    }

    if (reservation.numberOfPeople <= 0) {
      toast.error('Number of people must be greater than 0');
      return false;
    }

    if (!reservation.date || !reservation.time) {
      toast.error('Date and time are required');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateFields()) {
      return;
    }
    setIsModalOpen(true);
  };

  const confirmSubmit = async () => {
    try {
      if (!id) throw new Error('No reservation ID found');
      await dispatch(
        updateReservation({
          ...reservation,
          id: id as string,
          date: `${reservation.date}T${reservation.time}`,
        }),
      );
      toast.success('Reservation updated successfully!');
      router.push(`/reservations`);
    } catch (error) {
      toast.error('Error updating reservation!');
      console.error('Error updating reservation:', error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const cancelSubmit = () => {
    setIsModalOpen(false);
  };

  const statusOptions = [
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Completed', value: 'completed' },
    { label: 'Canceled', value: 'canceled' },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="mb-6 my-6 min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 w-full max-w-lg mx-auto"
      >
        <InputWithLabel
          type="text"
          placeholder="Enter customer name"
          label="Name"
          value={reservation.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <InputWithLabel
          type="number"
          placeholder="Enter number of persons"
          label="Number of Persons"
          value={reservation.numberOfPeople.toString()}
          onChange={(e) =>
            handleChange('numberOfPeople', Number(e.target.value))
          }
        />
        <InputWithLabel
          type="date"
          label="Reservation Date"
          value={reservation.date}
          onChange={(e) => handleChange('date', e.target.value)}
          min={new Date().toISOString().split('T')[0]}
        />
        <InputWithLabel
          type="time"
          label="Reservation Time"
          value={reservation.time}
          onChange={(e) => handleChange('time', e.target.value)}
        />
        <StatusChips
          label="Status"
          value={reservation.status}
          onChange={(value) => handleChange('status', value)}
          options={statusOptions}
        />
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Apply Changes
          </button>
        </div>
      </form>

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Changes"
        onClose={cancelSubmit}
      >
        <p>Are you sure you want to apply these changes?</p>
        <div className="flex justify-end space-x-3 mt-20">
          <button
            onClick={cancelSubmit}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={confirmSubmit}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Confirm
          </button>
        </div>
      </ConfirmationModal>
    </div>
  );
};

export default EditReservationForm;
