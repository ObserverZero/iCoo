<template id="yeah">
  <IonPage id="yup">
    <IonHeader>
      <p style="padding-top: 1.2em;"/>
    </IonHeader>
    <IonContent
      :scroll-events="true">
    <IonCard>wow</IonCard>
      <div v-if="content.content === 'list'">
        <div v-for="(value, name) in groups" :key="name">
          <div v-if="value.type === 'm.space'
          && value.name !== 'internal_groups'
          && value.name !== 'board'
          && value.name !== 'groups'
          && value.name !== 'chat'
          && value.name !== 'searchable'">
            <GroupItem
                :name="value.name"
                :id="value.id"
                :topic="value.topic.text"
                :handle="value.handle"
                :href="value.href"
                :banner="value.topic.banner"/>
          </div>
        </div>
      </div>
    </IonContent>
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonFabButton @click="openModal" color="dark">
        <IonIcon :icon="add"></IonIcon>
      </IonFabButton>
    </IonFab>
  </IonPage>
</template>

<script lang="ts">
/* eslint-disable vue/no-unused-components */
import {defineComponent, reactive} from 'vue';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  modalController,
  IonButton,
  IonMenu,
  IonMenuToggle,
  IonIcon,
  IonMenuButton,
  IonFabButton,
  IonFabList,
  IonFab,
  IonChip,
  IonItem,
  IonButtons,
  IonLabel,
  IonCard,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/vue';
import {
  arrowBack,
  chevronUpCircle,
  add,
  menu,
  close,
  search,
  personCircle,
  addCircle,
  bulb,
  caretUp,
  peopleCircle,
  chatbox,
  colorFilter,
  colorFilterSharp,
  clipboard,
} from 'ionicons/icons';
import {useMatrixClient} from '../stores/MatrixClient.js';
import GroupItem from "@/components/GroupItem.vue";
import CreateGroupModal from '@/menus/CreateGroupModal.vue';
import MainMenu from '@/menus/MainMenu.vue';

// TODO: get checkboxes/buttons to filter chats from tools etc
// TODO: Groups need to be able to migrate members from one group to another
// TODO: make a function that will resolve the whole address for a group, including all of /tabs/:id
// TODO: if (document.body.scrollTop < 0) should solve displaying searchbar

const client = useMatrixClient()

let content = reactive({content: 'load'})
let groups = reactive({})
let group = reactive({
  name: '',
  id: '',
  topic: '',
  type: '',
})

setInterval(() => {
  Object.assign(groups, client.getGroups())
  if (Object.keys(groups).length !== 0 && content.content !== 'group') {
    content.content = 'list'
  }
}, 5000)


function toolbarClicked() {
  content.content = 'list'
}

export default defineComponent({
  name: 'GroupsPage',
  components: {
    IonRefresher,
    IonRefresherContent,
    GroupItem,
    IonContent,
    IonPage,
    IonList,
    IonHeader,
    IonToolbar,
    IonFab,
    IonFabButton,
    IonButtons,
    IonItem,
    IonFabList,
    IonIcon,
    IonButton,
    IonTitle,
    IonSearchbar,
  },
  setup() {
    return {
      menu,
      close,
      personCircle,
      search,
      addCircle,
      add,
      bulb,
      chevronUpCircle,
      arrowBack,
      caretUp,
      peopleCircle,
      chatbox,
      colorFilterSharp,
      clipboard,
    }
  },
  data() {
    return {
      group: group,
      groups: groups,
      content: content,
    }
  },
  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: CreateGroupModal,
      });
      await modal.present();

      const {data, role} = await modal.onWillDismiss();

      if (role === 'confirm') {
        console.log("sure thing")
      }
    },
    handleScrollStart() {
        console.log('scroll start');
      },
    toolbarClicked: toolbarClicked
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        window.scroll(0, 50)
        Object.assign(groups, client.getGroups())
        if (Object.keys(groups).length !== 0 && content.content !== 'group') {
          content.content = 'list'
        }
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
});
</script>

<style scoped>
</style>