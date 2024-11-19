import React, { useEffect, useState, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../redux';
import { useRouter } from 'next/router';
import ConfirmationModal from '@/components/ConfirmationModal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import Image from 'next/image';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import StatusChip from '@/components/StatusChip';
import CustomSelect from '@/components/CustomSelect';
import SearchBar from '@/components/SearchForName';
import { capitalize } from '@/utils/capitalize';
import {
  fetchReservations,
  removeReservation,
  setStartDate,
  setStatus,
} from '@/redux/reservationsSlice';
import Loading from '@/components/Loading';
import ErrorState from '@/components/ErrorState';

const Filters = memo(
  ({
    filterStatus,
    startDate,
    onSearch,
    onStatusChange,
    onDateChange,
  }: {
    filterStatus: string;
    startDate: string | null;
    onSearch: (searchTerm: string) => void;
    onStatusChange: (value: string) => void;
    onDateChange: (value: string | null) => void;
  }) => {
    return (
      <div className="mb-6 flex justify-center space-x-6 items-center">
        <SearchBar placeholder="Search by name" onSearch={onSearch} />

        <CustomSelect
          options={[
            { value: '', label: 'All Statuses' },
            { value: 'pending', label: 'Pending' },
            { value: 'confirmed', label: 'Confirmed' },
            { value: 'canceled', label: 'Canceled' },
          ]}
          value={filterStatus}
          onChange={onStatusChange}
        />

        <div className="rounded-lg border-2 border-[#F8B81C] p-2">
          <input
            type="date"
            value={startDate || ''}
            onChange={(e) => onDateChange(e.target.value || null)}
            className="p-2"
          />
        </div>
      </div>
    );
  },
);

Filters.displayName = 'Filters';

const ReservationsList = memo(
  ({
    reservations,
    onDelete,
    onEdit,
  }: {
    reservations: any[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
  }) => {
    return (
      <ul
        className={`space-y-4 ${
          reservations.length > 4 ? 'max-h-[75vh] p-8 overflow-y-auto' : 'p-8'
        }`}
      >
        {reservations.map((reservation) => (
          <li
            key={reservation.id}
            className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center hover:bg-gray-50 transition-all duration-200"
          >
            <div className="flex flex-col space-y-2">
              <p className="font-semibold text-lg">
                {capitalize(reservation.name)}
              </p>
              <p className="text-sm text-gray-500">
                Booking:
                {reservation.numberOfPeople > 0
                  ? `${reservation.numberOfPeople} person${
                      reservation.numberOfPeople > 1 ? 's' : ''
                    }`
                  : null}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(Number(reservation.date)).toLocaleString()}
              </p>
              <StatusChip status={reservation.status} />
            </div>

            <div className="flex space-x-4">
              <span
                data-tooltip-id="edit-tooltip"
                data-tooltip-content="Edit reservation"
                className="cursor-pointer text-blue-500"
              >
                <FaEdit size={20} onClick={() => onEdit(reservation.id)} />
              </span>

              <span
                data-tooltip-id="delete-tooltip"
                data-tooltip-content="Delete reservation"
                className="cursor-pointer text-red-500"
              >
                <FaTrashAlt
                  size={20}
                  onClick={() => onDelete(reservation.id)}
                />
              </span>

              <Tooltip id="edit-tooltip" />
              <Tooltip id="delete-tooltip" />
            </div>
          </li>
        ))}
      </ul>
    );
  },
);

ReservationsList.displayName = 'ReservationsList';

const ReservationsPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('');
  const dispatch: AppDispatch = useDispatch();
  const { filters, items, status, error } = useSelector(
    (state: RootState) => state.reservations,
  );
  const router = useRouter();

  const { search, status: filterStatus, startDate } = filters;

  useEffect(() => {
    dispatch(fetchReservations({ search, status: filterStatus, startDate }));
  }, [dispatch, search, filterStatus, startDate]);

  const filteredReservations = items.filter((reservation) => {
    const matchSearch = reservation.name
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchStatus = filterStatus
      ? reservation.status.toLowerCase() === filterStatus.toLowerCase()
      : true;
    const matchDate =
      !startDate ||
      Number(reservation.date) >= moment(startDate, 'YYYY-MM-DD').valueOf();

    return matchSearch && matchStatus && matchDate;
  });

  const handleSearch = (searchTerm: string) => {
    dispatch(
      fetchReservations({
        search: searchTerm,
        status: filterStatus,
        startDate,
      }),
    );
  };

  const handleDelete = (id: string) => {
    setIsModalOpen(true);
    setSelectedId(id);
  };

  const handleEdit = (id: string) => {
    router.push(`reservations/editReservation/${id}`);
  };

  const confirmDelete = () => {
    dispatch(removeReservation(selectedId))
      .then(() => {
        toast.success('Reservation deleted successfully.');
      })
      .catch(() => {
        toast.error('Failed to delete reservation.');
      })
      .finally(() => {
        setIsModalOpen(false);
      });
  };

  const renderContent = () => {
    if (status === 'loading') {
      return <Loading />;
    }

    if (status === 'failed' && error) {
      return <ErrorState status={status} error={error} />;
    }

    if (filteredReservations.length === 0) {
      return (
        <div className="flex justify-center items-center min-h-full max-h-full h-screen">
          <Image
            src="/images/no_reservations.png"
            alt="no reservations"
            width={350}
            height={200}
            className="object-contain"
          />
        </div>
      );
    }

    return (
      <ReservationsList
        reservations={filteredReservations}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    );
  };

  return (
    <div className="min-h-screen p-6">
      <Filters
        filterStatus={filterStatus}
        startDate={startDate}
        onSearch={handleSearch}
        onStatusChange={(value) => dispatch(setStatus(value))}
        onDateChange={(value) => dispatch(setStartDate(value))}
      />

      {renderContent()}

      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Changes"
        onClose={() => setIsModalOpen(false)}
      >
        <p>Are you sure you want to apply these changes?</p>
        <div className="flex justify-end space-x-3 mt-20">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium transition-colors duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Confirm
          </button>
        </div>
      </ConfirmationModal>
    </div>
  );
};

export default ReservationsPage;
