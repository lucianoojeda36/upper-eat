import { createReservationMutation } from '@/graphql/mutations/createReservation';

export const createReservationData = async ({
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
  const variables = { name, status, date, numberOfPeople };

  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: createReservationMutation,
      variables,
    }),
  });

  const result = await response.json();
  return result.data.createReservation;
};
