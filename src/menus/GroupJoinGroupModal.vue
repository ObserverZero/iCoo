<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton @click="close">close</IonButton>
      </IonButtons>
      <IonSearchbar></IonSearchbar>
    </IonToolbar>
  </IonHeader>
  <IonFooter>
    <IonToolbar>
      <IonInput
        v-model="text"
        placeholder="wtf?"
        :clear-on-edit="true"
        id="bottomInput"
      ></IonInput>
      <IonButtons slot="end">
        <IonButton id="join" @click="sendAndFetch"> Join </IonButton>
      </IonButtons>
    </IonToolbar>
  </IonFooter>
  <IonContent>
    <IonCard>
      <IonCardHeader>
        {{ updated.topic.text }}
      </IonCardHeader>
    </IonCard>
    <div>v-for list of Groups</div>
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
} from "@ionic/vue";
import { send } from "ionicons/icons";
import { notifications } from "ionicons/icons";
import { defineComponent, ref } from "vue";
import { useMatrixClient } from "@/stores/MatrixClient.js";

const client = useMatrixClient();

let groupId = ref("");
let content = ref({});

export default defineComponent({
  name: "GroupJoinGroupModal",
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
    };
  },
  data() {
    let updated = client.updateChat(this.$props.message.id);
    let alternateTimeline = ref({});
    return {
      text: "",
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
      return modalController.dismiss(null, "cancel");
    },
    async fetchData() {
      return;
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        return;
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true },
    );
  },
});
</script>
