export const FetchReservationForIdQuery = `
query FetchReservationForId($id:ID!) {
  reservationForId(id: $id) {
    id
    name
    status
    date
    numberOfPeople
  }
}
`;
