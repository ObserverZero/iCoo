<template>

  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton color="medium" @click="cancel">Cancel</IonButton>
      </IonButtons>
      <IonTitle>New Post</IonTitle>
      <IonButtons slot="end">
        <IonButton @click="confirm">
          <IonIcon :icon="send" color="secondary"></IonIcon>
        </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonItem>
      <IonTextarea :autoGrow="true" v-model="topic" placeholder="What's on your mind?"></IonTextarea>
    </IonItem>
  </IonContent>

</template>

<script lang="ts">
/* eslint-disable vue/no-unused-components */
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  modalController,
  IonTextarea,
} from '@ionic/vue';
import {
    send,
} from 'ionicons/icons'
import { defineComponent, ref } from 'vue';
import { useMatrixClient } from '@/stores/MatrixClient.js';

const client = useMatrixClient()

let checked = false

export default defineComponent({
  name: 'CreateGroupModal',
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
    IonTextarea,
  },
  data() {
    let id = ref('')
    return {
      name: '',
      topic: '',
      send,
      id: this.$props.chatSpaceId,
    };
  },
  props: {
    chatSpaceId: String,
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, 'cancel');
    },
    confirm() {
      let completeTopic = '{"text": "' + this.topic + '","banner":"factory"}'
      client.createPost(this.id, completeTopic)
      return modalController.dismiss(this.name, 'confirm');
    },
  },
});
</script>

<style>
/*
  ion-modal {
    --height: 50%;
    --border-radius: 16px;
    --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  ion-modal::part(backdrop) {
    background: rgba(209, 213, 219);
    opacity: 1;
  }

  ion-modal ion-toolbar {
    --background: rgb(14 116 144);
    --color: white;
  }
*/
</style>
