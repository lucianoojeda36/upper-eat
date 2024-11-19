export const createReservationMutation = `
mutation CreateReservation($name: String!, $status: String!, $date: String!,$numberOfPeople: Int!) {
  createReservation(name: $name, status: $status, date: $date,numberOfPeople:$numberOfPeople) {
    id
    name
    status
    date
    numberOfPeople
  }
}
`;
