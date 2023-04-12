import {defineStore} from 'pinia'
import sdk, {EventType} from 'matrix-js-sdk'
import { convertCompilerOptionsFromJson } from 'typescript'

const loginCreds = {
  accessToken: process.env.VUE_APP_TOKEN,
  userId: process.env.VUE_APP_NAME,
  baseUrl: 'http://localhost:8008'
}

const client = sdk.createClient({
  baseUrl: loginCreds.baseUrl,
  accessToken: loginCreds.accessToken,
  userId: loginCreds.userId,
})

const localClient = sdk.createClient({
  baseUrl: loginCreds.baseUrl,
})

client.startClient()

function createUser(username, password) {
  // TODO: Add a room for the user that handles additional user information, such as hashtags, description, images,
  // TODO - friends lists, following, memberships, etc.
}

function getHandleFromUserId() {
  return loginCreds.userId.replace(/:.*/, '')
}

function getHandleFromRoomId(id) {
  return id.replace(/:.*/, '')
}

function login() {
  client.loginWithPassword(process.env.VUE_APP_ID, process.env.VUE_APP_PASS).then(() => {
    console.log('Logged in!')
  })
}

function getIdentifiedListOfGroups(ids) {
  Object.entries(ids => {
    console.log(ids.id)
  })
}

async function getAllUsers() {
  let users = client.getUsers()
  return users
}

// GETTERS

function getRoomTopicFromRoomObject(room) {
  let topic = room.currentState.getStateEvents('m.room.topic', '')
  try {
    return JSON.parse(topic.event.content.topic)
  } catch (error) {
    console.log(error)
    if (topic == String)
      return topic
    return "We do nothing!"
  }
}

function getRoomType(roomId) {
  let room = client.getRoom(roomId)
  let type = room.currentState.getStateEvents('m.room.create', '')
  try {
    return type.event.content.type
  } catch (error) {
    return 'no type for you!!'
  }
}

function getRoomName(room) {
  let roomName = room.name
  return roomName
}

function returnRoomNamesFromRoomObject(rooms) {
  const roomNames = rooms.map(room => room.name)
  return roomNames
}

function returnRoomIdsFromRoomObject(rooms) {
  const roomIds = rooms.map(room => room.roomId)
  return roomIds
}

function returnRoomTypeFromRoomObject(rooms) {
  const roomTypes = rooms.map(room => getRoomType(room.id))
}

async function getRoomById(roomId) {
  try {
    let room = await client.getRoom(roomId)
    const name = room.name
    const topic = getRoomTopicFromRoomObject(room)
    const group = {
      name: name,
      topic: topic,
    }
    return group
  } catch (error) {
    return
  }
}

function updateChat(roomId) {
  let room = client.getRoom(roomId)
  let creator = room.currentState.getStateEvents('m.room.create', '')
  let idAndTopicObject = {
    id: roomId,
    creator: creator.event.content.creator.replace(/:.*/, ''),
    topic: getRoomTopicFromRoomObject(room),
    content: getRoomTimeline(roomId),
  }
  return idAndTopicObject
}

function isParent() {
  return
}

function isChild() {
  return
}

export async function getOwnProfile() {
  let responseFromServer = await client.getProfileInfo(loginCreds.userId)
  responseFromServer.handle = getHandleFromUserId()
  responseFromServer.displayname = JSON.parse(responseFromServer.displayname)
  console.log(responseFromServer)
  return responseFromServer
}

async function getTimeline(roomId) {
  return client.roomInitialSync(roomId, 1000)
}

async function setArbitraryEvent(roomId, eventType, content) {
  return
}

async function printProfile() {
  console.log(await client.getProfileInfo(loginCreds.userId))
}

function getRoomTimeline(roomId) {
  let room = client.getRoom(roomId)
  let messageArray = []
  room.timeline.forEach(t => {
    messageArray.push(t.event)
  });
  return messageArray
}

function returnIdOfChildrenInSpace(spaceId) {
  let space = client.getRoom(spaceId)
  let childrenMap
  try {
    childrenMap = space.relations.room.currentState.events
  } catch {
    return
  }
  let roomArray = []
  let roomChildren = []
  let arrayOfRoomIds = []
  let childrenIds = []
  roomArray = Array.from(childrenMap, function (entry) {
    return {key: entry[0], value: entry[1]};
  });
  roomArray.forEach(room => {
    if (room.key === 'm.space.child') {
      roomChildren = room.value
    }
  })
  roomArray = Array.from(roomChildren, function (entry) {
    return {key: entry[0], value: entry[1]};
  });
  roomArray.forEach(room => {
    arrayOfRoomIds.push(room.key)
  })
  return arrayOfRoomIds
}

function getChildren(spaceId) {
  let ids = returnIdOfChildrenInSpace(spaceId)
  let roomObjects = []
  ids.forEach(id => {
    roomObjects.push(client.getRoom(id))
  })
  console.log(roomObjects)
  return roomObjects
}

function getGroupContent(groupId) {
  let content = {}
  let groups = getChildren(groupId)
  groups.forEach(child => {
    if (child != null) {
      let name = child.name
      let id = child.roomId
      let children = getChildren(child.roomId)
      let arrayOfTopics = []
      let idAndTopicObject = {}
      content[name] = {}
      children.forEach(item => {
        console.log(getRoomTimeline(item.roomId))
        try {
          let creator = item.currentState.getStateEvents('m.room.create', '')
          idAndTopicObject[item.roomId] = {
            id: item.roomId,
            creator: creator.event.content.creator.replace(/:.*/, ''),
            topic: getRoomTopicFromRoomObject(item),
            content: getRoomTimeline(item.roomId),
          }
        } catch {
          return
        }
      })
      content[name] = {
        id: id,
        children: idAndTopicObject,
      }
    }
  })
  console.log(content)
  return content
}

function getChatContent(groupId) {
  let content = getGroupContent(groupId)
  return content.chat
}

function getSubgroupContent(groupId) {
  let content = getGroupContent(groupId)
  return content.groups
}

function getBoardContent(groupId) {
  let content = getGroupContent(groupId)
  return content.board
}

function produceHrefAddressesForGroups(rooms) {
  const roomIds = rooms.map(room => {
    let id = room.roomId.replace(/:.*/, '')
    id = id.replace(/!/, '')
    id = "/tabs/group/" + id
    return id
  })
  // roomIds.forEach(roomId => console.log(roomId))
  return roomIds
}

function getGroups() {
  let rooms = client.getRooms()
  let roomNamesAndIdsAsObject = {}
  let roomNames = returnRoomNamesFromRoomObject(rooms)
  let roomIds = returnRoomIdsFromRoomObject(rooms)
  let hrefs = produceHrefAddressesForGroups(rooms)
  let roomHandles = roomIds.map(roomId => getHandleFromRoomId(roomId))
  let roomTopics = rooms.map(room => getRoomTopicFromRoomObject(room))
  let roomTypes = roomIds.map(roomId => getRoomType(roomId))
  let roomProduct = []
  for (let i = 0; i < roomNames.length; i++) {
    roomProduct.push({
      name: roomNames[i],
      id: roomIds[i],
      topic: roomTopics[i],
      type: roomTypes[i],
      handle: roomHandles[i],
      href: hrefs[i],
    })
  }
  Object.assign(roomNamesAndIdsAsObject, roomProduct)
  return roomNamesAndIdsAsObject
}

// SETTERS

function createSubSpace(parentSpaceId, subSpaceName, subSpaceTopic, roomId) {
  client.sendStateEvent(roomId, 'm.space.parent', {
    via: ['home.parecon.work'],
    state_key: parentSpaceId,
    canonical: true,
  })
  return
}

async function joinRoomSearchable() {
  let room = await client.joinRoom('#searchable:home.parecon.work')
  console.log(room)
  return room
}

async function createSpace(groupName, topic, publicorprivate) {
  let returnValue = await client.createRoom({
    name: groupName,
    visibility: 'public',
    topic: topic,
    creation_content: {
      type: 'm.space',
    },
    power_lever_content: {
      "users": {creator_id: 100},
      "users_default": 100,
    }
  }).then((response) => {
    console.log(`Room created: ${response.room_id}`)
    return response.room_id
  }).catch((error) => {
    console.error(`Error creating room: ${error}`)
  })
  return returnValue
}

async function createRoom(roomName, topic) {
  let returnValue = await client.createRoom({
    name: roomName,
    visibility: 'public',
    topic: topic,
    power_lever_content: {
      "users": {creator_id: 100},
      "users_default": 100,
    }
  }).then((response) => {
    console.log(`Room created: ${response.room_id}`)
    return response.room_id
  }).catch((error) => {
    console.error(`Error creating room: ${error}`)
  })
  return returnValue
}

async function createPost(chatSpaceId, topic) {
  let newRoom = await createRoom("post", topic)
  assignChild(chatSpaceId, newRoom)
  assignParent(newRoom, chatSpaceId)
  return
}

function assignChild(parentSpaceId, childSpaceId) {
  client.sendStateEvent(parentSpaceId, 'm.space.child', {
    via: ['home.parecon.work'],
  }, childSpaceId).then((error) => {
    console.log(error)})
  console.log("assigned child")
}

function assignParent(childSpaceId, parentSpaceId) {
  client.sendStateEvent(childSpaceId, 'm.space.parent', {
    canonical: true,
    via: ['home.parecon.work'],
  }, parentSpaceId)
  console.log("assigned parent")
}

async function assignParentAndChild(parentSpaceId, childSpaceId) {
  assignChild(parentSpaceId, childSpaceId)
  assignParent(childSpaceId, parentSpaceId)
  return true
}

async function createRealGroup(groupName, topic) {
  let mainSpaceId = await createSpace(groupName, '{"text": "' + topic + '", "banner": "group"}')
  let chatSpaceId = await createSpace("chat", '{"text": "chat", "banner": "group"}')
  let boardSpaceId = await createSpace("board", '{"text": "board", "banner": "group"}')
  let calendarSpaceId = await createSpace("groups", '{"text": "groups", "banner": "group"}')
  assignParentAndChild(mainSpaceId, chatSpaceId).then(() => {
    assignParentAndChild(mainSpaceId, boardSpaceId).then(() => {
      assignParentAndChild(mainSpaceId, calendarSpaceId)
    })
  })
  return mainSpaceId
}

async function createSubGroup(groupName, topic, parentGroupSpaceId) {
  let mainSpaceId = await createRealGroup(groupName, topic)
  assignParentAndChild(parentGroupSpaceId, mainSpaceId)
  return
}

function joinGroup(groupId) {
  client.joinRoom(groupId).then((response) => {
    // meh
  }).catch((error) => {
    // meh
  })
}

async function getRoomState() {
  let shortlist = []
  let shortlistObject = {}
  let response = await client.roomState("!OGEhHVWSdvArJzumhm:matrix.org")
    .then((response) => {
      for (let i = 0; i < 100; i++) {
        shortlist.push(response[i])
        Object.assign(shortlistObject, shortlist)
      }
      return shortlistObject
    })
  return response
}

async function checkIfSearchable() {
  let room = await client.roomState('!ZTKcfJhyKdTvMbfPpD:home.parecon.work')
  console.log(room)
}

async function getMessages(roomId) {
  client.initialSync(roomId).then((response) => {
    const timeline = response.timeline;
    // Do something with the timeline, such as render it in a chat interface
  }).catch((error) => {
    console.error(`Error fetching initial sync for room ${roomId}: ${error}`);
  })
}

function sendMessage(roomId, message) {
  const content = {
    body: "A hobbit trying to scale mount everest",
    msgtype: "m.text",
  }
  client.sendEvent("roomId", "m.room.message", content, "", (err, res) => {
    console.log(err)
  })
}

function updateTimeline(roomId) {
  //client.on("Room.timeline", function (event, room, toStartOfTimeline) {
  //  if (toStartOfTimeline) {
  //    var messageToAppend = room.timeline[room.timeline.length - 1]
  //    return messageToAppend
  //  }
  //})
  client.on("Room.timeline", function (event, room, toStartOfTimeline) {
    if (event.getType() !== "m.room.message") {
      return; // only use messages
    }
})
}

async function getMembersOfRoom(roomId) {
  let room = await client.getRoom(roomId)
  let members = room.getMembers()
  return members
}

function sendText(roomId, text) {
  client.sendTextMessage(roomId, text)
}

function accountData() {
  return client.getAccountData()
}

// TODO - Add a getter to get a room's timeline
// TODO - Get a filter to get a group's associated groups
// TODO -
// TODO: Ranking functionality of group membership to curate what appears on top
// TODO - of the list on group profile. Use the "suggested" value of space children
// TODO - to determine whether the rooms are considered important. Canonical parent
// TODO - is also useful

export const useMatrixClient = defineStore('matrix-client', {
  state: () => {
    return ({
      client,
      getGroups,
      getOwnProfile,
      getMembersOfRoom,
      returnIdOfChildrenInSpace,
      getChildren,
      getRoomById,
      getRoomTimeline,
      getGroupContent,
      getChatContent,
      getSubgroupContent,
      getMessages,
      login,
      sendText,
      accountData,
      assignParent,
      assignChild,
      createRealGroup,
      updateChat,
      getTimeline,
      createPost,
      createSubGroup,
      joinRoomSearchable,
      getAllUsers,
    })
  },
  getters: {
    getRooms: (state) => () => {
      return state.getRooms()
    },
    updateTimeline: (state) => () => {
      return updateTimeline()
    },
    getRoomState: (state) => () => {
      return getRoomState()
    },
  },
  setters: {
    login: (state) => () => {
      return state.login()
    }
  }
})
