import { FetchReservationForIdQuery } from '@/graphql/queries/fetchReservationForId';

export const fetchReservationsDataForId = async (id: string) => {
  const variables = { id };

  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: FetchReservationForIdQuery,
      variables,
    }),
  });

  const result = await response.json();
  return result.data.reservationForId;
};
