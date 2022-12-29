import {defineStore} from 'pinia';
import sdk, {EventType} from 'matrix-js-sdk';

const loginCreds = {
  accessToken: "syt_b2JzZXJ2ZXJ6ZXJv_qbsSNMdGRZpXMsNvXJeX_3OODDh",
  userId: "@observerzero:matrix.org",
  baseUrl: 'https://matrix.org'
}
const client = sdk.createClient({
  baseUrl: loginCreds.baseUrl,
  accessToken: loginCreds.accessToken,
  userId: loginCreds.userId,
});

client.startClient();

function login() {
  client.loginWithPassword('username', 'password').then(function () {
    console.log('Logged in!')
  })
}

// GETTERS

function getRoomTopic(roomId) {
  let room = client.getRoom(roomId);
  let topic = room.currentState.getStateEvents('m.room.topic', '');
  try {
    return topic.event.content.topic;
  } catch (error) {
    return 'We do nothing!';
  }
}

function getRoomType(roomId) {
  let room = client.getRoom(roomId);
  let type = room.currentState.getStateEvents('m.room.create', '');
  try {
    return type.event.content.type;
  } catch (error) {
    return 'no type for you!!';
  }
}

function returnRoomNamesFromRoomObject(rooms) {
  const roomNames = rooms.map(room => room.name);
  return roomNames;
}

function returnRoomIdsFromRoomObject(rooms) {
  const roomIds = rooms.map(room => room.roomId);
  return roomIds;
}

function returnRoomTypeFromRoomObject(rooms) {
  const roomTypes = rooms.map(room => getRoomType(room.id));
}

function getGroups() {
  let rooms = client.getRooms()
  let roomNamesAndIdsAsObject = {};
  let roomNames = returnRoomNamesFromRoomObject(rooms)
  let roomIds = returnRoomIdsFromRoomObject(rooms);
  let roomTopics = roomIds.map(roomId => getRoomTopic(roomId));
  let roomTypes = roomIds.map(roomId => getRoomType(roomId));
  let roomProduct = [];
  for (let i = 0; i < roomNames.length; i++) {
    roomProduct.push({
      name: roomNames[i],
      id: roomIds[i],
      topic: roomTopics[i],
      type: roomTypes[i],
    })
  }
  Object.assign(roomNamesAndIdsAsObject, roomProduct)
  console.log(roomNamesAndIdsAsObject)
  return roomNamesAndIdsAsObject;
}

// SETTERS

function setRoomType(checked) {
  if (checked) {
    return 'm.space';
  } else {
    return 'm.room';
  }
}

// TODO: add type for space or room
function createGroup(groupName, topic, type) {
  client.createRoom({
    name: groupName,
    visibility: 'private',
    topic: topic,
    room_type: 'm.space',
  }).then((response) => {
    console.log(type);
    console.log(`Room created: ${response.room_id}`);
  }).catch((error) => {
    console.error(`Error creating room: ${error}`);
  });
}

//TODO - Add a getter to get a room's timeline
//TODO - Add a getter to get a room's type

export const useMatrixClient = defineStore('matrix-client', {
  state: () => {
    return ({
      client: client,
      getGroups: getGroups,
      createGroup: createGroup,
      login: login,
    });
  },
  getters: {
    getRooms: (state) => () => {
      return state.getRooms();
    },
    getRoomNamesAndIds: (state) => () => {
      return state.getGroups();
    },
  },
  setters: {
    createGroup: (state) => (groupName) => {
      return state.createGroup(groupName);
    },
    login: (state) => () => {
      return state.login();
    }
  }
})
