import { DeleteReservationMutation } from '@/graphql/mutations/deleteReservation';

export const removeReservationData = async (id: string) => {
  const mutation = `
    mutation DeleteReservation($id: ID!) {
      deleteReservation(id: $id) {
        id
      }
    }
  `;

  const variables = { id };

  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: DeleteReservationMutation,
      variables,
    }),
  });

  const result = await response.json();
  return result.data.deleteReservation.id;
};
