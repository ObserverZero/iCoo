<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton @click="close">close</IonButton>
      </IonButtons>
      <IonSearchbar></IonSearchbar>
      <IonButtons slot="end">
        <IonButton>
          <IonIcon :icon="notifications" color="tertiary"/>
          <IonBadge slot="end" color="danger">2</IonBadge>
        </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
  <IonFooter>
    <IonToolbar>
      <IonInput 
        v-model="text" 
        placeholder="wtf?"
        :clear-on-edit="true"
        id="bottomInput"></IonInput>
      <IonButtons slot="end">
        <IonButton id="send" @click="sendAndFetch">
          <IonIcon :icon="send" color="primary"/>
        </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonFooter>
  <IonContent>
      <IonCard>
        <IonCardHeader>
          {{ updated.topic.text }}
        </IonCardHeader>
      </IonCard>
    <div v-for="entry in alternateTimeline.messages.chunk" v-bind:key="entry" :value="content">
      <div v-if="entry.type === 'm.room.message'">
        <ChatBubble :text="entry.content.body" :sender="entry.sender" :content="entry" :id="entry.event_id" indent="0"/>
    </div>
    </div>
  </IonContent>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  modalController,
  IonCheckbox,
  IonIcon,
  IonBadge,
  IonSearchbar,
  IonModal,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonTextArea,
  IonChip,
} from '@ionic/vue';
import {
  send,
} from 'ionicons/icons';
import {notifications} from "ionicons/icons";
import {defineComponent, ref} from 'vue';
import {useMatrixClient} from '@/stores/MatrixClient.js';
import ChatBubble from '@/components/ChatBubble.vue';

const client = useMatrixClient()

let groupId = ref('')
let content = ref({})


export default defineComponent({
  name: 'ChatModal',
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonFooter,
    modalController,
    IonCheckbox,
    IonIcon,
    IonBadge,
    IonSearchbar,
    IonModal,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonTextArea,
    IonChip,
    ChatBubble,
  },
  setup() {
    return {
      notifications,
    }
  },
  data() {
    let updated = client.updateChat(this.$props.message.id)
    let alternateTimeline = ref({})
    return {
      text: '',
      content: this.$props.message,
      updated,
      send,
      alternateTimeline,
    };
  },
  props: {
    message: Object,
  },
  methods: {
    close() {
      return modalController.dismiss(null, 'cancel');
    },
    async sendText() {
      let returned = await client.sendText(this.content.id, this.text)
      document.getElementById('bottomInput').value = ''
    },
    async fetchData() {
      this.alternateTimeline = await client.getTimeline(this.$props.message.id)
      console.log(this.alternateTimeline)
      setInterval(async () => {
        this.alternateTimeline = await client.getTimeline(this.$props.message.id)
        this.updated = await client.updateChat(this.$props.message.id)
      }, 1000)
      this.alternateTimeline = await client.getTimeline(this.$props.message.id)
      return
    },
    sendAndFetch() {
      this.sendText()
      this.fetchData()
    },
  },
  created() {
    this.$watch(
        () => this.$route.params,
        () => {
          this.fetchData()
        },
        // fetch the data when the view is created and the data is
        // already being observed
        {immediate: true}
    )
  },
});
</script>
