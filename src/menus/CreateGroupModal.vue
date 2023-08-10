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
    <IonItem>
      <IonCheckbox v-model="checkedEvent" />
      <IonLabel>This is an Event</IonLabel>
    </IonItem>
    <div v-if="checkedEvent">
      <IonDatetime />
      <IonDatetime />
    </div>
    <IonItem>
      <IonCheckbox v-model="checkedKickstarters" />
      <IonLabel>Announce on Kickstarters</IonLabel>
    </IonItem>
    <IonItem>
      <div v-if="checkedKickstarters">
        <IonTextarea :auto-grow="true" placeholder="Tell us about it" />
      </div>
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
  IonDatetime,
  IonTextarea,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { useMatrixClient } from "@/stores/MatrixClient.js";

const client = useMatrixClient();

let checked = false;

export default defineComponent({
  name: "CreateGroupModal",
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
    IonCheckbox,
    IonDatetime,
    IonTextarea,
  },
  data() {
    return {
      name: "",
      topic: "",
      checkedKickstarters: false,
      checkedEvent: false,
    };
  },
  props: {
    message: String,
  },
  methods: {
    cancel() {
      return modalController.dismiss(null, "cancel");
    },
    confirm() {
      client.createRealGroup(this.name, this.topic);
      return modalController.dismiss(this.name, "confirm");
    },
  },
});
</script>
