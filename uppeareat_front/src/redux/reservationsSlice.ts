import { fetchReservationsData } from '@/api/fetchReservationsData';
import { updateReservationData } from '@/api/updateReservationData';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { removeReservationData } from '@/api/removeReservationData';
import { createReservationData } from '@/api/createReservationData';
import { fetchReservationsDataForId } from '@/api/fetchReservationDataForId';

export interface Reservation {
  id: string;
  status: string;
  startDate?: string | null;
  startTime?: string | null;
  [key: string]: any;
}

export interface ReservationState {
  items: Reservation[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filters: {
    search: string;
    status: string;
    startDate: string | null;
    startTime: string | null;
  };
}

const initialState: ReservationState = {
  items: [],
  status: 'idle',
  error: null,
  filters: {
    search: '',
    status: '',
    startDate: null,
    startTime: null,
  },
};

export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async ({
    search,
    status,
    startDate,
  }: {
    search: string;
    status: string;
    startDate: string | null;
  }) => {
    try {
      const data = await fetchReservationsData({ search, status, startDate });

      return data;
    } catch (error) {
      throw error;
    }
  },
);

export const fetchReservationForId = createAsyncThunk(
  'reservations/fetchReservationForId',
  async (id: string) => {
    try {
      const data = await fetchReservationsDataForId(id);

      return data;
    } catch (error) {
      throw error;
    }
  },
);

export const updateReservation = createAsyncThunk(
  'reservations/updateReservation',
  async ({ id, name, status, date, numberOfPeople }: Reservation) => {
    try {
      const response = await updateReservationData({
        id,
        name,
        status,
        date,
        numberOfPeople,
      });
      return response;
    } catch (error) {
      throw error;
    }
  },
);

export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async ({
    name,
    status,
    date,
    numberOfPeople,
  }: {
    name: string;
    status: string;
    date: string | null;
    numberOfPeople: number;
  }) => {
    const createdData = await createReservationData({
      name,
      status,
      date,
      numberOfPeople,
    });
    return createdData;
  },
);

export const removeReservation = createAsyncThunk(
  'reservations/removeReservation',
  async (id: string) => {
    try {
      const deletedReservationId = await removeReservationData(id);
      return deletedReservationId;
    } catch (error) {
      throw error;
    }
  },
);

const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.filters.status = action.payload;
    },
    setStartDate: (state, action: PayloadAction<string | null>) => {
      state.filters.startDate = action.payload;
    },
    setStartTime: (state, action: PayloadAction<string | null>) => {
      state.filters.startTime = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to fetch reservations';
      })
      .addCase(updateReservation.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateReservation.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateReservation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Failed to update reservation';
      })
      .addCase(removeReservation.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export const { setSearch, setStatus, setStartDate, setStartTime } =
  reservationsSlice.actions;

export default reservationsSlice.reducer;
