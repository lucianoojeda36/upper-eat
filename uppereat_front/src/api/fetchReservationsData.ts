import { FetchReservationsQuery } from '@/graphql/queries/fetchReservations';

export const fetchReservationsData = async ({
  search,
  status,
  startDate,
}: {
  search: string;
  status: string;
  startDate: string | null;
}) => {
  const variables = { status, search, startDate };

  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: FetchReservationsQuery,
      variables,
    }),
  });

  const result = await response.json();
  return result.data.reservations;
};
