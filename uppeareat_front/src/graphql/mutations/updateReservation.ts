export const UpdateReservationMutation = `
mutation UpdateReservation($id: ID!, $status: String!,$name: String!,$date: String!,$numberOfPeople:Int!) {
  updateReservation(id: $id,status: $status,name: $name,date:$date,numberOfPeople:$numberOfPeople ) {
    id
    status
    name
    date
    numberOfPeople
  }
}
`;
