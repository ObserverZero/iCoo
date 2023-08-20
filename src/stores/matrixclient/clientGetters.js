/*
  Getters for the matrix client.
  */

function getPublicRooms() {
  const rooms = fetch("http://localhost:8008/_matrix/client/r0/publicRooms", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + process.env.VUE_APP_TOKEN,
    },
  }).then((response) => {
    return response.json();
  });
  return rooms;
}

export default {
  getPublicRooms,
};
