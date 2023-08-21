import {
    defineStore
} from "pinia";
import sdk, {
    EventType
} from "matrix-js-sdk";
import {
    getPublicRooms
} from "./matrixclient/clientGetters.js";
import {
    fiveSecTimeout,
    tenSecTimeout
} from "./matrixclient/helperFunctions";

// Login creds are stored in node environment variables and accessed
// via the "mode" argument when running the dev server.
const loginCreds = {
    accessToken: process.env.VUE_APP_TOKEN,
    userId: process.env.VUE_APP_NAME,
    network: "http://192.168.10.132:8008",
    local: "http://0.0.0.0:8008",
};

const client = sdk.createClient({
    baseUrl: loginCreds.local,
    accessToken: loginCreds.accessToken,
    userId: loginCreds.userId,
});

const localClient = sdk.createClient({
    baseUrl: loginCreds.baseUrl,
});

client.startClient();

function listenForNewMessages(roomId) {
    client.on("Room.timeline", (event, room, toStartOfTimeline) => {
        if (event.getType() === "m.room.message") {
            const sender = event.getSender();
            const content = event.getContent();
            if (content.msgtype === "m.text") {
                const message = content.body;
                console.log(`${sender}: ${message}`);
            }
        }
    });
}

function listenForNewRooms() {
    client.on("RoomState.events", (event, room, toStartOfTimeline) => {
        if (event.getType() === "m.space.child") {
            // New child room (room within the space) has been added
            const childRoomId = event.getContent().room_id;
            // Join the new room
            client
                .joinRoom(childRoomId)
                .then(() => {
                    console.log(`Joined room: ${childRoomId}`);
                })
                .catch((error) => {
                    //console.error(`Error joining room: ${childRoomId}`, error);
                });
        }
    });
}

function createUser(username, password) {
    // TODO: Add a room for the user that handles additional user
    //       information, such as hashtags, description, images,
    // TODO: friends lists, following, memberships, etc.
}

// Takes the user's name on the server and removes the domain
function getHandleFromUserId() {
    return loginCreds.userId.replace(/:.*/, "");
}

// Takes a room's name on the server and removes the domain,
// creating a handle for the room with a "&" prefix.
function getHandleFromRoomId(id) {
    return id.replace(/:.*/, "");
}

//Basic login function.
function login() {
    client
        .loginWithPassword(process.env.VUE_APP_ID, process.env.VUE_APP_PASS)
        .then(() => {
            console.log("Logged in!");
        });
}

async function getAllUsers() {
    let users = client.getUsers();
    return users;
}

function getRoomTopicFromRoomObject(room) {
    let topic = room.currentState.getStateEvents("m.room.topic", "");
    try {
        return JSON.parse(topic.event.content.topic);
    } catch (error) {
        console.log(error);
        if (topic == String) return topic;
        return "We do nothing!";
    }
}

function getRoomType(roomId) {
    let room = client.getRoom(roomId);
    let type = room.currentState.getStateEvents("m.room.create", "");
    try {
        return type.event.content.type;
    } catch (error) {
        return "no type for you!!";
    }
}

function getRoomName(room) {
    let roomName = room.name;
    return roomName;
}

function returnRoomNamesFromRoomObject(rooms) {
    const roomNames = rooms.map((room) => room.name);
    return roomNames;
}

function returnRoomIdsFromRoomObject(rooms) {
    const roomIds = rooms.map((room) => room.roomId);
    return roomIds;
}

function returnRoomTypeFromRoomObject(rooms) {
    const roomTypes = rooms.map((room) => getRoomType(room.id));
}

function getRoomFromRoomArray(roomId) {
    const rooms = getPublicRooms();
    const room = rooms.find((room) => room.room_id == roomId);
    return room;
}

async function getRoomById(roomId) {
    try {
        let room = client.getRoom(roomId);
        const name = room.name;
        const topic = getRoomTopicFromRoomObject(room);
        const group = {
            name: name,
            topic: topic,
        };
        return group;
    } catch (error) {
        console.log(error);
        return null;
    }
}

function updateChat(roomId) {
    let room = client.getRoom(roomId);
    let creator = room.currentState.getStateEvents("m.room.create", "");
    let idAndTopicObject = {
        id: roomId,
        creator: creator.event.content.creator.replace(/:.*/, ""),
        topic: getRoomTopicFromRoomObject(room),
        content: getRoomTimeline(roomId),
    };
    return idAndTopicObject;
}

async function getOwnProfile() {
    let responseFromServer = await client.getProfileInfo(loginCreds.userId);
    responseFromServer.handle = getHandleFromUserId();
    responseFromServer.displayname = JSON.parse(responseFromServer.displayname);
    return responseFromServer;
}

async function getTimeline(roomId) {
    return client.roomInitialSync(roomId, 1000);
}

function getRoomTimeline(roomId) {
    let room = client.getRoom(roomId);
    let messageArray = [];
    room.timeline.forEach((t) => {
        messageArray.push(t.event);
    });
    return messageArray;
}

function createMessageBoard(messageArray) {
    // Arranges an array of messages into a message board
    // reply structure, returning an object.
    let messageBoard = {};

    return;
}

function functionWithInnerFunctionForRecurrence() {
    function innerFunction() {
        try {
            console.log("wow");
        } catch {
            innerFunction();
        }
    }
}

function getAttributesFromGroup(spaceId) {
    // Collects messages belonging to spaces for use in Kickstarters or Events

}

async function getAllPublicSpaces() {
    try {
        // Step 1: Get a list of all public rooms on the server
        const publicRooms = await client.publicRooms();

        // Step 2: Filter out rooms that are spaces
        const publicSpaces = publicRooms.chunk.filter(
            (room) => room["room_type"] === "m.space",
        );
        return publicSpaces;
    } catch (error) {
        //console.error("Error retrieving public spaces:", error);
        return [];
    }
}

async function autoJoinNewRoomsInSpace() {
    try {
        // Start listening for space-related events
        client.on("RoomState.events", (event, room, toStartOfTimeline) => {
            if (event.getType() === "m.space.child") {
                // New child room (room within the space) has been added
                const childRoomId = event.getContent().room_id;

                // Join the new room
                client
                    .joinRoom(childRoomId)
                    .then(() => {
                        console.log(`Joined room: ${childRoomId}`);
                    })
                    .catch((error) => {
                        //console.error(`Error joining room: ${childRoomId}`, error);
                    });
            }
        });
        console.log("Listening for new rooms in spaces to auto-join...");
    } catch (error) {
        //console.error("Error:", error);
    }
}

function getChildrenIds(spaceId) {
    const space = client.getRoom(spaceId);
    let childrenMap;
    try {
        childrenMap = space.currentState.events.get("m.space.child");
    } catch (error) {
        console.log(error);
        return [];
    }
    let childrenIdArray = Array.from(childrenMap.keys());
    return childrenIdArray;
}

function getChildren(spaceId) {
    let ids = getChildrenIds(spaceId);
    let roomObjects = [];
    ids.forEach((id) => {
        roomObjects.push(client.getRoom(id));
    });
    joinRooms(roomObjects);
    return roomObjects;
}

async function asyncGetGroupContent(groupId) {
    let content = {};
    let groups = getChildren(groupId);
    let name;
    let id;
    let children;
    let idAndTopicObject = {};
}

function getGroupContent(groupId) {
    let content = {};
    let groups = getChildren(groupId);
    let name;
    let id;
    let children;
    let idAndTopicObject = {};
    groups.forEach((child) => {
        if (child != null) {
            name = child.name;
            id = child.roomId;
            try {
                children = getChildren(id);
            } catch (error) {
                content[name] = {
                    id: id,
                };
                return;
            }
            idAndTopicObject = {};
            content[name] = {};
            children.forEach((item) => {
                try {
                    let creator = item.currentState.getStateEvents("m.room.create", "");
                    idAndTopicObject[item.roomId] = {
                        id: item.roomId,
                        creator: creator.event.content.creator.replace(/:.*/, ""),
                        topic: getRoomTopicFromRoomObject(item),
                        content: getRoomTimeline(item.roomId),
                        href: "/tabs/group/" + item.roomId.replace(/:.*/, "").replace(/!/, ""),
                    };
                } catch (error) {
                    return;
                }
            });
            content[name] = {
                id: id,
                children: idAndTopicObject,
            };
        }
    });
    return content;
}

function getChatContent(groupId) {
    let content = getGroupContent(groupId);
    return content.chat;
}

function getSubgroupContent(groupId) {
    let content = getGroupContent(groupId);
    return content.groups;
}

function getBoardContent(groupId) {
    let content = getGroupContent(groupId);
    return content.board;
}

function produceHrefAddressesForGroups(rooms) {
    const roomIds = rooms.map((room) => {
        let id = room.roomId.replace(/:.*/, "");
        id = id.replace(/!/, "");
        id = "/tabs/group/" + id;
        return id;
    });
    // roomIds.forEach(roomId => console.log(roomId))
    return roomIds;
}

function getGroups() {
    let rooms = client.getRooms();
    let roomNamesAndIdsAsObject = {};
    let roomNames = returnRoomNamesFromRoomObject(rooms);
    let roomIds = returnRoomIdsFromRoomObject(rooms);
    let hrefs = produceHrefAddressesForGroups(rooms);
    let roomHandles = roomIds.map((roomId) => getHandleFromRoomId(roomId));
    let roomTopics = rooms.map((room) => getRoomTopicFromRoomObject(room));
    let roomTypes = roomIds.map((roomId) => getRoomType(roomId));
    let messages = rooms.map((room) => getRoomTimeline(room.roomId));
    let roomProduct = [];
    for (let i = 0; i < roomNames.length; i++) {
        roomProduct.push({
            name: roomNames[i],
            id: roomIds[i],
            topic: roomTopics[i],
            type: roomTypes[i],
            handle: roomHandles[i],
            href: hrefs[i],
            messages: messages[i],
        });
    }
    Object.assign(roomNamesAndIdsAsObject, roomProduct);
    console.log(roomNamesAndIdsAsObject);
    return roomNamesAndIdsAsObject;
}

function filterGroupsWithTimestamps(groups) {
    return;
}

async function createSpace(groupName, topic, visibility = "public") {
    let returnValue = await client
        .createRoom({
            name: groupName,
            visibility: visibility,
            topic: topic,
            creation_content: {
                type: "m.space",
            },
            initial_state: [{
                    type: "m.room.message",
                    content: {
                        msgtype: "m.text",
                        body: "wowowow! take 'er easy there, pilgrim.'",
                    },
                    sender: client.getUserId(),
                },
                {
                    type: "m.room.power_levels",
                    content: {
                        users_default: 100,
                    },
                },
                {
                    type: "m.room.join_rules,",
                    content: {
                        join_rule: "public",
                    },
                },
            ],
        })
        .then((response) => {
            console.log(`Room created: ${response.room_id}`);
            return response.room_id;
        })
        .catch((error) => {
            //console.error(`Error creating room: ${error}`);
        });
    return returnValue;
}

async function createRoom(roomName, topic) {
    let returnValue = await client
        .createRoom({
            name: roomName,
            visibility: "public",
            topic: topic,
            initial_state: [{
                type: "m.room.power_levels",
                content: {
                    users_default: 100,
                },
            }, ],
        })
        .then((response) => {
            console.log(`Room created: ${response.room_id}`);
            return response.room_id;
        })
        .catch((error) => {
            //console.error(`Error creating room: ${error}`);
        });
    return returnValue;
}

async function createPost(chatSpaceId, topic) {
    let newRoom = await createRoom("post", topic);
    assignChild(chatSpaceId, newRoom);
    assignParent(newRoom, chatSpaceId);
    return;
}

async function groupJoinGroup(joiningGroupId, joinedGroupId) {
    let joiningGroup = await getRoomById(joiningGroupId);
    let joinedGroup = await getRoomById(joinedGroupId);
    return;
}

function assignChild(parentSpaceId, childSpaceId) {
    setTimeout(() => {
        try {
            client.sendStateEvent(
                parentSpaceId,
                "m.space.child", {
                    via: ["matrix.icoo.org"],
                },
                childSpaceId,
            );
            console.log("assigned child");
        } catch (error) {
            setTimeout(() => {
                client.sendStateEvent(
                    parentSpaceId,
                    "m.space.child", {
                        via: ["matrix.icoo.org"],
                    },
                    childSpaceId,
                );
                console.log("assigned child");
            }, 2000);
        }
    }, 5000);
}

function assignParent(childSpaceId, parentSpaceId) {
    setTimeout(() => {
        try {
            client.sendStateEvent(
                childSpaceId,
                "m.space.parent", {
                    canonical: true,
                    via: ["matrix.icoo.org"],
                },
                parentSpaceId,
            );
            console.log("assigned parent");
        } catch (error) {
            setTimeout(() => {
                client.sendStateEvent(
                    childSpaceId,
                    "m.space.parent", {
                        canonical: true,
                        via: ["matrix.icoo.org"],
                    },
                    parentSpaceId,
                );
                console.log("assigned parent");
            }, 2000);
        }
    }, 5000);
}

function assignParentAndChild(parentSpaceId, childSpaceId) {
    // Assigning child has to happen before assigning parent
    // because of server permissions.
    setTimeout(() => {
        try {
            assignChild(parentSpaceId, childSpaceId);
        } catch (error) {
            assignChild(parentSpaceId, childSpaceId);
        }
        try {
            assignParent(childSpaceId, parentSpaceId);
        } catch (error) {
            assignParent(childSpaceId, parentSpaceId);
        }
    }, 10000);
}

function joinRooms(roomIdArray) {
    roomIdArray.forEach((roomId) => {
        if (typeof roomId == String) {
            client.joinRoom(roomId);
            console.log("joined " + roomId);
        } else if (typeof roomId == Object) {
            client.joinRoom(roomId.roomId);
            console.log("joined " + roomId.roomId);
        }
    });
}

async function createSubGroup(topic, groupSpaceId) {
    let subGroupId = await createRealGroup("subgroup", topic);
    console.log(subGroupId);
    console.log("meh");
    fiveSecTimeout(assignParentAndChild(groupSpaceId, subGroupId));
}

async function createRealGroup(groupName, topic, visibility = "public") {
    let mainSpaceId = await createSpace(
        groupName,
        '{"text": "' + topic + '", "banner": "group"}',
    );
    let chatSpaceId = await createSpace(
        "chat",
        '{"text": "chat", "banner": "group"}',
        visibility,
    );
    let boardSpaceId = await createSpace(
        "board",
        '{"text": "board", "banner": "group"}',
        visibility,
    );
    let calendarSpaceId = await createSpace(
        "groups",
        '{"text": "groups", "banner": "group"}',
        visibility,
    );
    let memberGroupsSpaceId = await createSpace(
        "memberGroups",
        '{"text": "membergroups", "banner": "group"}',
        visibility,
    );
    fiveSecTimeout(assignParentAndChild(mainSpaceId, chatSpaceId));
    fiveSecTimeout(assignParentAndChild(mainSpaceId, boardSpaceId));
    fiveSecTimeout(assignParentAndChild(mainSpaceId, calendarSpaceId));
    tenSecTimeout(assignParentAndChild(mainSpaceId, memberGroupsSpaceId));
    return mainSpaceId;
}

async function createSubpGroup(topic, parentGroupId) {
    let subGroupId = await createRealGroup("subgroup", topic, "private");
    assignParentAndChild(parentGroupId, subGroupId);
    return;
}

function joinGroup(groupId) {
    client
        .joinRoom(groupId)
        .then((response) => {
            // meh
        })
        .catch((error) => {
            // meh
        });
    // Join main Group. Then join the others. 
}

async function getRoomState() {
    let shortlist = [];
    let shortlistObject = {};
    let response = await client
        .roomState("!OGEhHVWSdvArJzumhm:matrix.org")
        .then((response) => {
            for (let i = 0; i < 100; i++) {
                shortlist.push(response[i]);
                Object.assign(shortlistObject, shortlist);
            }
            return shortlistObject;
        });
    return response;
}

async function getMessages(roomId) {
    client
        .initialSync(roomId)
        .then((response) => {
            const timeline = response.timeline;
            return timeline;
            // Do something with the timeline, such as render it in a chat interface
        })
        .catch((error) => {
            //console.error(`Error fetching initial sync for room ${roomId}: ${error}`);
        });
}

function updateTimeline(roomId) {
    client.on("Room.timeline", function(event, room, toStartOfTimeline) {
        if (event.getType() !== "m.room.message") {
            return; // only use messages
        }
    });
}

async function getMembersOfRoom(roomId) {
    let room = await client.getRoom(roomId);
    let members = room.getMembers();
    return members;
}

function sendText(roomId, text) {
    client.sendTextMessage(roomId, text);
}

function accountData() {
    return client.getAccountData();
}

async function getChildRoomsOfSpace(matrixClient, spaceId) {
    try {
        const response = matrixClient.getRoomState(spaceId);
        const childEvents = response.filter(
            (event) => event.type === "m.space.child",
        );
        const childRoomIds = childEvents.map((event) => event.content.room_id);
        const childRooms = Promise.all(
            childRoomIds.map((roomId) => matrixClient.getRoom(roomId)),
        );
        return childRooms;
    } catch (error) {
        //console.error("Error fetching child rooms:", error);
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

export const useMatrixClient = defineStore("matrix-client", {
    state: () => {
        return {
            client,
            //getters
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
            getPublicRooms,
            getTimeline,
            getAllUsers,
            getRoomFromRoomArray,
            getAllPublicSpaces,
            //setters
            login,
            sendText,
            accountData,
            assignParent,
            assignChild,
            createRealGroup,
            updateChat,
            createPost,
            createSubGroup,
            joinRooms,
        };
    },
});
