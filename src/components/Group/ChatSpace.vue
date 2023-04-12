<template ref="chatSpace">

  <div v-if="JSON.stringify(this.messages.children) == '{}'">
    <IonCard>
      <IonCardHeader>
        <IonCardSubtitle>Noone:</IonCardSubtitle>
        <IonCardSubtitle>How much conversation!</IonCardSubtitle>
        <IonCardSubtitle>You:</IonCardSubtitle>
        <IonCardSubtitle></IonCardSubtitle>
      </IonCardHeader>
    </IonCard>
  </div>
  <div v-else>
  <div v-for="value in messages.children" v-bind:key="value">
    <ChatItem :message="value"/>
  </div>
</div>

  <IonFab slot="fixed" vertical="bottom" horizontal="end">
    <IonFabButton color="dark" @click="openModal">
      <IonIcon :icon="chatbox"></IonIcon>
    </IonFabButton>
  </IonFab>

</template>

<script>
/* eslint-disable vue/no-unused-components */
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonCardContent,
  IonList,
  IonItem,
  modalController,
  IonModal,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonSearchbar,
  IonTitle,
  IonContent,
  IonInput,
  IonLabel,
  IonFab,
  IonFabButton,
  IonFabList,
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
import ChatItem from "@/components/ChatItem.vue";
import {defineComponent, reactive, ref} from 'vue';
import { useMatrixClient } from "@/stores/MatrixClient";
import {useCrossPage} from "@/stores/CrossPageUpdates";
import CreateChatModal from "@/menus/CreateChatModal.vue";
import ChatBubble from "@/components/ChatBubble.vue";

let client = useMatrixClient();

let chats = ref({})

export default {
  name: "ChatSpace",
  data() {
    let noContent = ref(true)
    return {
      chats,
      addCircle,
      add,
      chatbox,
      noContent,
      chatBubbleText: "I just think that sometimes I just really wanna get to mars you know kind of or in a way that this room could be like this small spaceship and really take me away to mars",
    }
  },
  setup() {
    return {}
  },
  components: {
    ChatItem,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonCardContent,
    IonList,
    IonItem,
    modalController,
    IonModal,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonButton,
    IonSearchbar,
    IonTitle,
    IonContent,
    IonInput,
    IonLabel,
    IonFab,
    IonFabButton,
    IonFabList,
    ChatBubble,
  },
  props: {
    messages: Object,
  },
  methods: {

    async fetchData() {
      //content.value.creator = content.value.creator.replace(/:.*/, '')
    },

    async openModal() {
      const modal = await modalController.create({
        component: CreateChatModal,
        componentProps: {
          chatSpaceId: this.messages.id,
        }
      });
      return await modal.present();
    },
  },

  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        this.fetchData()
        setInterval(async () => {
          return
        }, 2000);
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
}

</script>

<style scoped>
</style>
