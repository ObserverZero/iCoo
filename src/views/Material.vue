<template>
  <IonPage>
    <IonHeader>
      <p style="padding-top: 1.4em" />
    </IonHeader>
    <IonContent ref="stuff" :scroll-events="true">
      <IonItem>
        <IonSegment>
          <IonSegmentButton value="hardware"> Hardware </IonSegmentButton>
          <IonSegmentButton value="produce"> Produce </IonSegmentButton>
          <IonSegmentButton value="service"> Service </IonSegmentButton>
          <IonItem>
            <IonIcon :icon="menu" />
          </IonItem>
        </IonSegment>
      </IonItem>
    </IonContent>
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonFabButton @click="openModal" color="dark">
        <IonIcon :icon="add"></IonIcon>
      </IonFabButton>
    </IonFab>
  </IonPage>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { defineComponent, ref, reactive } from "vue";
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
  IonCardHeader,
  IonSearchbar,
  IonRefresher,
  IonRefresherContent,
  IonSegment,
  IonSegmentButton,
} from "@ionic/vue";
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
  calendarClear,
  colorFilter,
  colorFilterSharp,
  clipboard,
} from "ionicons/icons";
import { useMatrixClient } from "../stores/MatrixClient.js";
import GroupItem from "@/components/GroupItem.vue";
import KickstartItem from "@/components/KickstartItem.vue";
import CreateGroupModal from "@/menus/CreateGroupModal.vue";
import { useScroll } from "@vueuse/core";

// TODO: get checkboxes/buttons to filter chats from tools etc
// TODO: Groups need to be able to migrate members from one group to another
// TODO: if (document.body.scrollTop < 0) should solve displaying searchbar

const client = useMatrixClient();

export default defineComponent({
  name: "MaterialsPage",
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
    IonCard,
    IonCardHeader,
    IonSegment,
    IonSegmentButton,
    KickstartItem,
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
      calendarClear,
    };
  },
  data() {
    return {};
  },
  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: CreateGroupModal,
      });
      await modal.present();

      const { data, role } = await modal.onWillDismiss();

      if (role === "confirm") {
        console.log("sure thing");
      }
    },
    segmentChanged(event) {
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
      {
        immediate: true,
      },
    );
  },
});
</script>

<style scoped></style>
