import {defineStore} from 'pinia'
import sdk, {EventType} from 'matrix-js-sdk'
import { convertCompilerOptionsFromJson } from 'typescript'

// Login creds are stored in node environment variables and accessed
// via the "mode" argument when running the dev server.
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
  // TODO: Add a room for the user that handles additional user
  //       information, such as hashtags, description, images,
  // TODO: friends lists, following, memberships, etc.
}

// Takes the user's name on the server and removes the domain
function getHandleFromUserId() {
  return loginCreds.userId.replace(/:.*/, '')
}

// Takes a room's name on the server and removes the domain,
// creating a handle for the room with a "&" prefix.
function getHandleFromRoomId(id) {
  return id.replace(/:.*/, '')
}

//Basic login function.
function login() {
  client.loginWithPassword(
      process.env.VUE_APP_ID, 
      process.env.VUE_APP_PASS)
  .then(() => {
      console.log('Logged in!')
  })
}

async function getAllUsers() {
  let users = client.getUsers()
  return users
}

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

function getPublicRooms() {
  const rooms = fetch('http://localhost:8008/_matrix/client/r0/publicRooms', {
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

function getRoomFromRoomArray(roomId) {
  const rooms = getPublicRooms()
  const room = rooms.find(room => room.room_id == roomId)
  return room
}

async function getRoomById(roomId) {
  try {
      let room = client.getRoom(roomId)
      console.log(roomId)
      const name = room.name
      const topic = getRoomTopicFromRoomObject(room)
      const group = {
          name: name,
          topic: topic,
      }
      return group
  } catch (error) {
      console.log(error)
      return null
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

export async function getOwnProfile() {
  let responseFromServer = await client.getProfileInfo(loginCreds.userId)
  responseFromServer.handle = getHandleFromUserId()
  responseFromServer.displayname = JSON.parse(responseFromServer.displayname)
  return responseFromServer
}

async function getTimeline(roomId) {
  return client.roomInitialSync(roomId, 1000)
}

function getRoomTimeline(roomId) {
  let room = client.getRoom(roomId)
  let messageArray = []
  room.timeline.forEach(t => {
      messageArray.push(t.event)
  });
  return messageArray
}

function getChildrenIds(spaceId) {
  const space = client.getRoom(spaceId)
  let childrenMap
  try {
      childrenMap = space.currentState.events.get('m.space.child')
  } catch (error) {
      console.log(error)
      return []
  }
  let childrenIdArray = Array.from( childrenMap.keys() )
  console.log(childrenIdArray)
  return childrenIdArray
}

function getChildren(spaceId) {
  let ids = getChildrenIds(spaceId)
  let roomObjects = []
  ids.forEach(id => {
      roomObjects.push(client.getRoom(id))
  })
  joinRooms(roomObjects)
  console.log(roomObjects)
  return roomObjects
}

function getGroupContent(groupId) {
  let content = {}
  let groups = getChildren(groupId)
  let name
  let id
  let children
  let idAndTopicObject = {}
  groups.forEach(child => {
    if (child != null) {
      name = child.name
      id = child.roomId
      try {
        children = getChildren(id)
      } catch (error) {
        return
      }
      idAndTopicObject = {}
      content[name] = {}
      children.forEach(item => {
        try {
          let creator = item.currentState.
            getStateEvents('m.room.create', '')
            idAndTopicObject[item.roomId] = {
              id: item.roomId,
              creator: creator.event.content.creator.replace(/:.*/, ''),
              topic: getRoomTopicFromRoomObject(item),
              content: getRoomTimeline(item.roomId),
            }
          } catch (error) {
            return
        }
      })
      content[name] = {
        id: id,
        children: idAndTopicObject,
      }
    }
  })
  return content
}

function getChatContent(groupId) {
  let content = getGroupContent(groupId)
  console.log("content: ", content)
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
  console.log(rooms)
  return roomNamesAndIdsAsObject
}

function filterGroupsWithTimestamps(groups) {
  return
}

// SETTERS

function createSubSpace(
  parentSpaceId, 
  subSpaceName, 
  subSpaceTopic, 
  roomId) {
  client.sendStateEvent(roomId, 'm.space.parent', {
    via: ['matrix.icoo.org'],
    state_key: parentSpaceId,
    canonical: true,
  })
  return
}

async function createGroupMainSpace(groupname, topic, handle) {
  return
}

async function createSpace(groupName, topic, visibility = 'public') {
  let returnValue = await client.createRoom({
    name: groupName,
    visibility: visibility,
    topic: topic,
    creation_content: {
      type: 'm.space',
    },
//    power_level_content: {
//      "users": {creator_id: 100},
//      "users_default": 100,
//    },
    power_level_content: { 
      "users": {creator_id: 100}, 
      "users_default": 100, 
      "events_default": 0, 
      "state_default": 0, 
      "ban": 0, 
      "kick": 0, 
      "redact": 0, 
      "invite": 0, 
    },
    initial_state: [
      {
        type: "m.room.message",
          content: {
            msgtype: "m.text",
            body: "wowowow! take 'er easy there, pilgrim.'"
          },
          sender: client.getUserId()
      },
    ],
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
      power_level_content: {
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

async function groupJoinGroup(joiningGroupId, joinedGroupId) {
  let joiningGroup = await getRoomById(joiningGroupId)
  let joinedGroup = await getRoomById(joinedGroupId)
  return
}

function assignChild(parentSpaceId, childSpaceId) {
  client.sendStateEvent(parentSpaceId, 'm.space.child', {
      via: ['matrix.icoo.org'],
  }, childSpaceId).then((error) => {
      console.log(error)})
  console.log("assigned child")
}

function assignParent(childSpaceId, parentSpaceId) {
  client.sendStateEvent(childSpaceId, 'm.space.parent', {
      canonical: true,
      via: ['matrix.icoo.org'],
  }, parentSpaceId)
  console.log("assigned parent")
}

async function assignParentAndChild(parentSpaceId, childSpaceId) {
  assignChild(parentSpaceId, childSpaceId)
  assignParent(childSpaceId, parentSpaceId)
  return true
}

function joinRooms(roomIdArray) {
  roomIdArray.forEach(roomId => {
      setTimeout(() => {
          console.log("timeouting")
      }, 1000)
      if (typeof roomId == String) {
          client.joinRoom(roomId)
          console.log('joined ' + roomId)
      } else if (typeof roomId == Object) {
          client.joinRoom(roomId.roomId)
          console.log('joined ' + roomId.roomId)
      }
  })
}

async function createRealGroup(groupName, topic, visibility = 'public') {
  let mainSpaceId = await createSpace(
      groupName, '{"text": "' + topic + '", "banner": "group"}')
  let chatSpaceId = await createSpace(
      "chat", '{"text": "chat", "banner": "group"}')
  let boardSpaceId = await createSpace(
      "board", '{"text": "board", "banner": "group"}')
  let calendarSpaceId = await createSpace(
      "groups", '{"text": "groups", "banner": "group"}')
  assignParentAndChild(mainSpaceId, chatSpaceId).then(() => {
      assignParentAndChild(mainSpaceId, boardSpaceId).then(() => {
          assignParentAndChild(mainSpaceId, calendarSpaceId)
      })
  })
  return mainSpaceId
}

async function createSubGroup(groupName, topic, parentGroupSpaceId) {
  let mainSpaceId = await createRealGroup(groupName, topic, 'private')
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

async function getChildRoomsOfSpace(matrixClient, spaceId) {
  try {
      const response = matrixClient.getRoomState(spaceId);
      const childEvents = response.filter(
          (event) => event.type === "m.space.child");
      const childRoomIds = childEvents.map(
          (event) => event.content.room_id);
      const childRooms = Promise.all(
          childRoomIds.map((roomId) => matrixClient.getRoom(roomId))
      );
      return childRooms;
  } catch (error) {
      console.error("Error fetching child rooms:", error);
      return [];
  }
}

function getSubgroupsChatsAndBoardsFromGroup(rooms, names) {
  if (!names || names.length === 0) {
      return rooms;
  }
  return rooms.filter((room) => names.includes(room.name));
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
          getChildrenIds,
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
          getAllUsers,
          getPublicRooms,
          getRoomFromRoomArray,
          joinRooms,
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

//const roomStateReducer = (acc, event) => {
//    switch (event.type) {
//        case 'm.room.create': {
//            acc.type = (event.content?.type) ? event.content.type : 'm.room'
//            acc.id = event.content['io.syncpoint.odin.id']
//            break 
//        }
//        case 'm.room.name': { acc.name = event.content.name; break }
//        case 'm.room.canonical_alias': { acc.canonical_alias = event.content.alias; break }
//        case 'm.room.topic': { acc.topic = event.content.topic; break }
//        case 'm.room.member': { if (acc.members) { acc.members.push(event.state_key) } else { acc['members'] = [event.state_key] }; break }
//        case 'm.space.child': { if (acc.children) { acc.children.push(event.state_key) } else { acc['children'] = [event.state_key] }; break }
//        // case 'io.syncpoint.odin.id': { acc.id = event.content?.id; break }
//    }
//    return acc
//}
//
//async invitedProjects () {
//        const filter = {
//            room: {
//                timeline: { not_types: [ '*' ] }
//            }
//        }
//        const state = await this.httpAPI.sync(undefined, filter, 0)
//        const projects = {}
//
//        for (const [roomId, content] of Object.entries(state.rooms?.invite || {})) {
//            const room = content.invite_state.events.reduce(roomStateReducer, { room_id: roomId })
//            if (room.type === 'm.space' && room.id) {
//                projects[roomId] = room
//            }
//        }
//
//        return projects
//    }
