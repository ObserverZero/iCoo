<template>
  <SmallGroupItem name="Nothing to be done" topic="Emptyness. Nothing to be done."/>

  <IonFab slot="fixed" vertical="bottom" horizontal="end">
    <IonFabButton color="dark" @click="openModal">
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
} from '@ionic/vue';
import {defineComponent, reactive, ref} from 'vue';
import { useMatrixClient } from "@/stores/MatrixClient";
import { chatbox, calendarClear } from 'ionicons/icons';
import SmallGroupItem from '@/components/SmallGroupItem.vue'
import CreateSubGroupModal from '@/menus/CreateSubGroupModal.vue'


export default {
  name: "GroupSpace",
  setup() {
    return {
      calendarClear,
    }
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
        }
      });
      return await modal.present();
    },
  }
}

</script>

<style scoped>
</style>
