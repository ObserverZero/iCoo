<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Groups</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">

      <IonButton expand="block" @click="openModal">New Group</IonButton>

      <div v-if="content === 'list'">
        <IonList v-for="(value, name) in groups" :key="name">
          <GroupItem
              :name="value.name"
              :id="value.id"
              :topic="value.topic"
              @click="groupItemClicked(value.id)"/>
        </IonList>
      </div>
      <div v-else-if="content === 'group'">
        <Group></Group>
      </div>
      <div v-else>
        wow, u good!
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  modalController,
  IonButton
}
  from '@ionic/vue';
import {useMatrixClient} from '../stores/MatrixClient.js';
import GroupItem from "@/components/GroupItem.vue";
import Group from "@/components/Group.vue";
import Modal from '@/menus/Modal.vue';
import {openModal} from '../menus/MenuFunctions.js';

// TODO - Ranking functionality of group membership to curate what appears on top of the list on group profile

const client = useMatrixClient()

let content = 'list'

let groups = reactive({})

setInterval(() => {
  Object.assign(groups, client.getGroups())
}, 1000)

function groupItemClicked(id) {
  console.log(id)
}

export default defineComponent({
  name: 'GroupsPage',
  components: {
    GroupItem,
    Group,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonPage,
    IonList,
    IonButton
  },
  data() {
    return {
      groups: groups,
      content: content
    }
  },
  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: Modal,
      });
      modal.present();

      const {data, role} = await modal.onWillDismiss();

      if (role === 'confirm') {
        console.log("sure thing")
      }
    },
    groupItemClicked: groupItemClicked,
  },
});
</script>
