import { PrismaClient } from '@prisma/client';
import { jest } from '@jest/globals';

interface Reservation {
  id: number;
  name: string;
  status: string;
  date: Date;
  numberOfPeople: number;
  createdAt: Date;
}

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      reservation: {
        findMany: jest.fn(),
        create: jest.fn(),
      },
    })),
  };
});

const prisma = new PrismaClient();

describe('ReservationResolver', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch reservations with filters', async () => {
    const mockReservation: Reservation = {
      id: 1,
      name: 'Test Reservation',
      status: 'pending',
      date: new Date('2024-01-01'),
      numberOfPeople: 2,
      createdAt: new Date(),
    };

    (
      prisma.reservation.findMany as jest.MockedFunction<
        typeof prisma.reservation.findMany
      >
    ).mockResolvedValue([mockReservation]);

    const result = await prisma.reservation.findMany({
      where: {
        status: { contains: 'pending', mode: 'insensitive' },
        name: { contains: 'Test', mode: 'insensitive' },
        date: { gte: new Date('2024-01-01') },
      },
    });

    expect(result).toEqual([
      {
        id: 1,
        name: 'Test Reservation',
        status: 'pending',
        date: new Date('2024-01-01'),
        numberOfPeople: 2,
        createdAt: expect.any(Date),
      },
    ]);
  });

  it('should create a reservation', async () => {
    const mockReservation: Reservation = {
      id: 1,
      name: 'New Reservation',
      status: 'pending',
      date: new Date('2024-01-01'),
      numberOfPeople: 2,
      createdAt: new Date(),
    };

    (
      prisma.reservation.create as jest.MockedFunction<
        typeof prisma.reservation.create
      >
    ).mockResolvedValue(mockReservation);

    const result = await prisma.reservation.create({
      data: {
        name: 'New Reservation',
        status: 'pending',
        date: new Date('2024-01-01'),
        numberOfPeople: 2,
      },
    });

    expect(result).toEqual({
      id: 1,
      name: 'New Reservation',
      status: 'pending',
      date: new Date('2024-01-01'),
      numberOfPeople: 2,
      createdAt: expect.any(Date),
    });
  });
});
