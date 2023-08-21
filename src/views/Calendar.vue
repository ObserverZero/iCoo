<template>
  <IonPage>
    <IonHeader>
      <p style="padding-top: 0.8em" />
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonSegment
        value="schedule"
        @ionChange="segmentChanged($event)"
        v-model="view"
      >
        <IonSegmentButton value="schedule"> Schedule </IonSegmentButton>
        <IonSegmentButton value="discover"> Discover </IonSegmentButton>
      </IonSegment>
      <div v-if="view == 'schedule'">
        <IonItem>
          <IonLabel> 8 May 2023 </IonLabel>
        </IonItem>
        <IonList>
          <CalendarItem name="Coming up!" id="sowhat" />
          <CalendarItem name="Coming up!" id="sowhat" />
        </IonList>
        <IonItem>
          <IonLabel> 19 May 2023 </IonLabel>
        </IonItem>
        <IonList>
          <CalendarItem name="Coming up!" id="sowhat" />
          <CalendarItem name="Coming up!" id="sowhat" />
          <CalendarItem name="Coming up!" id="sowhat" />
        </IonList>
      </div>
    </IonContent>
  </IonPage>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import { defineComponent, reactive, ref } from "vue";
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
  IonThumbnail,
  IonButtons,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from "@ionic/vue";
import { useMatrixClient } from "../stores/MatrixClient.js";
import CalendarItem from "@/components/CalendarItem.vue";
import { menu, close, search, personCircle, addCircle } from "ionicons/icons";

// TODO - Ranking functionality of group membership to curate what appears on top of the list on group profile

const client = useMatrixClient();

let groups = reactive({});
let view = ref("schedule");

export default defineComponent({
  /* eslint-disable vue/no-unused-components */
  name: "CalendarPage",
  components: {
    IonContent,
    IonPage,
    IonList,
    IonHeader,
    IonToolbar,
    IonLabel,
    IonTitle,
    IonButton,
    IonButtons,
    IonIcon,
    IonMenu,
    IonMenuToggle,
    IonMenuButton,
    IonItem,
    CalendarItem,
    IonSegment,
    IonSegmentButton,
  },
  data() {
    return {
      groups,
      view,
    };
  },
  setup() {
    return {
      menu,
      close,
      personCircle,
      search,
      addCircle,
    };
  },
  methods: {
    fetchCalendarItems() {
      return;
    },
    segmentChanged(event) {
      view.value = event.detail.value;
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        setInterval(() => {
          Object.assign(groups, client.getGroups());
        }, 5000);
        Object.assign(groups, client.getGroups());
        console.log(groups);
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true },
    );
  },
});
</script>

<style scoped></style>
