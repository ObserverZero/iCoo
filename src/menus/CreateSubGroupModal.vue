

<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton color="medium" @click="cancel">Cancel</IonButton>
      </IonButtons>
      <IonTitle>New Subgroup</IonTitle>
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
      <IonLabel position="stacked">Start</IonLabel>
        <IonDatetime></IonDatetime>
      <IonLabel position="stacked">End</IonLabel>
        <IonDatetime></IonDatetime>
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
  IonDatetime,
} from '@ionic/vue';
import {defineComponent} from 'vue';
import {useMatrixClient} from '@/stores/MatrixClient.js';

const client = useMatrixClient()

let checked = false

export default defineComponent({
  name: 'CreateSubGroupModal',
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
    IonDatetime,
  },
  data() {
    return {
      name: '',
      topic: '',
    };
  },
  props: {
    groupSpaceId: String,
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, 'cancel');
    },
    confirm() {
      //client.createSubGroup(this.name, this.topic)
      return modalController.dismiss(this.name, 'confirm');
    },
  },
});
</script>
