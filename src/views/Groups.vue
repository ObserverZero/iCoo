<template>
  <IonPage>
    <IonHeader>
      <p style="padding-top: 1.4em" />
    </IonHeader>
    <IonContent ref="stuff" :scroll-events="true">
      <IonItem>
        <IonSegment
          value="joined"
          @ionChange="segmentChanged($event)"
          v-model="view.value"
        >
          <IonSegmentButton value="Discover"> Discover </IonSegmentButton>
          <IonSegmentButton value="joined"> Joined </IonSegmentButton>
          <IonSegmentButton value="invites"> Invites </IonSegmentButton>
          <IonSegmentButton value="kickstart"> Kickstarters </IonSegmentButton>
          <IonItem>
            <IonIcon :icon="menu" />
          </IonItem>
        </IonSegment>
      </IonItem>
      <div v-if="view.value == 'joined'">
        <div v-for="(value, name) in groups" :key="name">
          <div
            v-if="
              value.type === 'm.space' &&
              value.name !== 'internal_groups' &&
              value.name !== 'board' &&
              value.name !== 'groups' &&
              value.name !== 'chat' &&
              value.name !== 'memberGroups'
            "
          >
            <GroupItem
              :name="value.name"
              :id="value.id"
              :topic="value.topic.text"
              :handle="value.handle"
              :href="value.href"
              :banner="value.topic.banner"
            />
          </div>
        </div>
      </div>
      <div v-else-if="view.value == 'kickstart'">
        <KickstartItem
          name="Permaculture Sognsvann"
          id="nope"
          topic="Starting a permaculture project at Sognsvann.
                 Need people who know their shit."
          handle="permakultursognsvann"
          href="something"
          banner="farm"
        />
        <KickstartItem
          name="Plastic Recycling Grünerløkka"
          id="yope"
          topic="Cutting up plastic and melting the shit.
                 Need people who like the smell of burning ethylene."
          handle="recyclegrunerlokka"
          href="something"
          banner="factory"
        />
        <KickstartItem
          name="iCoo initiative"
          id="icoo"
          topic="Initiative to amake an app for self organising.
                 Need hackers and UX people"
          handle="icooinitiative"
          href="something"
          banner="hacker_factory_semi_B&W"
        />
      </div>
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

let content = reactive({
  content: "joined",
});
let view = reactive({
  value: "joined",
});
let groups = reactive({});
let group = reactive({
  name: "",
  id: "",
  topic: "",
  type: "",
});

setInterval(() => {
  Object.assign(groups, client.getGroups());
  console.log(groups);
  if (Object.keys(groups).length !== 0 && content.content !== "group") {
    content.content = "list";
  }
}, 5000);

export default defineComponent({
  name: "GroupsPage",
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
    return {
      group: group,
      groups: groups,
      content: content,
      view: view,
    };
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
      view.value = event.detail.value;
      console.log(view.value);
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        Object.assign(groups, client.getGroups());
        if (Object.keys(groups).length !== 0 && content.content !== "group") {
          content.content = "list";
        }
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
