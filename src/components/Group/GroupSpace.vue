<template>
  <div v-for="(value, name) in groups.children" :key="name">
    <SmallGroupItem
      :name="value.name"
      :id="value.id"
      :topic="value.topic.text"
      :handle="value.handle"
      :href="value.href"
      :banner="value.topic.banner"
    />
  </div>

  <IonFab slot="fixed" vertical="bottom" horizontal="end">
    <IonFabButton color="dark" @click="createSomeSubgroup">
      <IonIcon :icon="calendarClear"></IonIcon>
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
  IonFab,
  IonFabButton,
  modalController,
} from "@ionic/vue";
import { defineComponent, reactive, ref } from "vue";
import { useMatrixClient } from "@/stores/MatrixClient";
import { chatbox, calendarClear } from "ionicons/icons";
import SmallGroupItem from "@/components/SmallGroupItem.vue";
import CreateSubGroupModal from "@/menus/CreateSubGroupModal.vue";

const client = useMatrixClient();

export default {
  name: "GroupSpace",
  setup() {
    return {
      calendarClear,
    };
  },
  components: {
    IonCardSubtitle,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonList,
    SmallGroupItem,
    IonFab,
    IonFabButton,
  },
  props: {
    groups: Object,
  },
  methods: {
    async openModal() {
      const modal = await modalController.create({
        component: CreateSubGroupModal,
        componentProps: {
          groupSpaceId: this.groups.id,
        },
      });
      return await modal.present();
    },
    async createSomeSubgroup() {
      client.createSubGroup("something ado", this.groups.id);
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        setInterval(() => {
          return;
        }, 2000);
      },
      {
        immediate: true,
      },
    );
  },
};
</script>

<style scoped></style>
