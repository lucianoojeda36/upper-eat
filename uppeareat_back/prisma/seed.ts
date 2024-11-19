import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('Inserting fake reservation data...');

  const reservations = [];
  for (let i = 0; i < 10; i++) {
    const reservation = await prisma.reservation.create({
      data: {
        name: faker.person.fullName(),
        status: faker.helpers.arrayElement([
          'Pending',
          'Confirmed',
          'Canceled',
        ]),
        date: faker.date.future(),
        numberOfPeople: faker.number.int({ min: 1, max: 10 }),
      },
    });
    reservations.push(reservation);
  }

  console.log('Inserted reservations:', reservations);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
