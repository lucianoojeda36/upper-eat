export const FetchReservationsQuery = `
query FetchReservations($status: String, $search: String, $startDate: String) {
  reservations(status: $status, search: $search, startDate: $startDate) {
    id
    name
    status
    date
    numberOfPeople
  }
}
`;
