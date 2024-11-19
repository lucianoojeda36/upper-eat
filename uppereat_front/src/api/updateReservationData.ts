import { UpdateReservationMutation } from '@/graphql/mutations/updateReservation';

export const updateReservationData = async ({
  id,
  status,
  name,
  date,
  numberOfPeople,
}: {
  id: string;
  status: string;
  name: string;
  date: string;
  numberOfPeople: number;
}) => {
  const variables = { id, name, status, date, numberOfPeople };

  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: UpdateReservationMutation,
      variables,
    }),
  });

  const result = await response.json();
  return result.data.updateReservation;
};
