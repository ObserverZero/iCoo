
<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton color="medium" @click="cancel">Cancel</IonButton>
      </IonButtons>
      <IonTitle>New Group</IonTitle>
      <IonButtons slot="end">
        <IonButton @click="confirm">Confirm</IonButton>
      </IonButtons>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonItem>
      <IonLabel position="stacked">Group Name</IonLabel>
      <IonInput v-model="name" placeholder="Name"></IonInput>
      <IonInput v-model="topic" placeholder="Description"></IonInput>
    </IonItem>
  </IonContent>
</template>

<script>
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
  IonCheckbox,
} from '@ionic/vue';
import {defineComponent} from 'vue';
import {useMatrixClient} from '@/stores/MatrixClient.js';

// TODO - Filter based on new projects which creates a kickstarter for people aspect

const client = useMatrixClient()

let checked = false

export default defineComponent({
  name: 'SearchGroupsModal',
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    IonInput
  },
  data() {
    return {
      name: '',
      topic: '',
    };
  },
  props: {
    message: String,
  }
  methods: {
    cancel() {
      return modalController.dismiss(null, 'cancel');
    },
    confirm() {
      client.createGroup(this.name, this.topic)
      return modalController.dismiss(this.name, 'confirm');
    },
  },
});
</script>
