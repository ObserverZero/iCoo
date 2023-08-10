
function getPublicRooms() {
  const rooms = fetch(
    'http://localhost:8008/_matrix/client/r0/publicRooms', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + process.env.VUE_APP_TOKEN
      }
    }).then(response => {
      return response.json()
    })
  console.log(rooms)
  return rooms
}

export default {
  getPublicRooms
}
