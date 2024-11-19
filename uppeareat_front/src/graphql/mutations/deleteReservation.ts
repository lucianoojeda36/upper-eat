export const DeleteReservationMutation = `
mutation DeleteReservation($id: ID!) {
  deleteReservation(id: $id) {
    id
  }
}
`;
