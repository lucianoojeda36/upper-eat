import { PrismaClient } from '@prisma/client';
import logger from '../../utils/logger';

const prisma = new PrismaClient();

export const ReservationResolver = {
  Query: {
    reservations: async (_: any, args: any) => {
      const { status, search, startDate } = args;

      logger.info(
        `Fetching reservations with filters: status=${status}, search=${search}, startDate=${startDate}`,
      );

      try {
        const reservations = await prisma.reservation.findMany({
          where: {
            status: status
              ? { contains: status, mode: 'insensitive' }
              : undefined,
            name: search
              ? { contains: search, mode: 'insensitive' }
              : undefined,
            date: startDate ? { gte: new Date(startDate) } : undefined,
          },
        });

        logger.info(`Fetched ${reservations.length} reservations`);
        return reservations.map((reservation) => ({
          ...reservation,
          status: reservation.status.toLowerCase(),
        }));
      } catch (error) {
        logger.error('Error fetching reservations:', error);
        throw new Error(
          'Unable to fetch reservations. Please try again later.',
        );
      }
    },

    reservationForId: async (parent: any, args: any) => {
      const { id } = args;
      if (!id) {
        logger.warn('ID is required to fetch reservation');
        throw new Error('ID is required to fetch reservation');
      }

      try {
        logger.info(`Fetching reservation with ID: ${id}`);
        return await prisma.reservation.findUnique({
          where: { id: Number(id) },
        });
      } catch (error) {
        logger.error('Error fetching reservation by ID:', error);
        throw new Error('Unable to fetch reservation. Please try again later.');
      }
    },
  },

  Mutation: {
    createReservation: async (_: any, args: any) => {
      const { name, status, date, numberOfPeople } = args;

      logger.info(
        `Creating reservation: ${name}, status=${status}, date=${date}, numberOfPeople=${numberOfPeople}`,
      );

      try {
        return await prisma.reservation.create({
          data: { name, status, date: new Date(date), numberOfPeople },
        });
      } catch (error) {
        logger.error('Error creating reservation:', error);
        throw new Error('Unable to create reservation');
      }
    },

    updateReservation: async (_: any, args: any) => {
      const { id, name, status, date, numberOfPeople } = args;

      if (!id) {
        logger.warn('Reservation ID is required');
        throw new Error('Reservation ID is required');
      }

      if (!name || !status || !date || !numberOfPeople) {
        logger.warn('Missing required fields');
        throw new Error('Missing required fields');
      }

      logger.info(
        `Updating reservation ID ${id}: ${name}, status=${status}, date=${date}, numberOfPeople=${numberOfPeople}`,
      );

      try {
        return await prisma.reservation.update({
          where: { id: Number(id) },
          data: { name, status, date: new Date(date), numberOfPeople },
        });
      } catch (error) {
        logger.error('Error updating reservation:', error);
        throw new Error('Unable to update reservation');
      }
    },

    deleteReservation: async (_: any, args: { id: number }) => {
      const { id } = args;

      logger.info(`Deleting reservation with ID: ${id}`);

      try {
        const existingReservation = await prisma.reservation.findUnique({
          where: { id: Number(id) },
        });

        if (!existingReservation) {
          logger.warn(`Reservation with ID ${id} not found`);
          throw new Error(`Reservation with ID ${id} not found.`);
        }

        return await prisma.reservation.delete({
          where: { id: Number(id) },
        });
      } catch (error) {
        logger.error('Error deleting reservation:', error);
        throw new Error('Failed to delete reservation');
      }
    },
  },
};
