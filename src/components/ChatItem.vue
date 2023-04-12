<template>
    <IonCard>
      <IonCardHeader>
        <IonItem href="/tabs/profile">
          <IonAvatar>
            <img alt="Person" src="../../public/assets/banners/hacker_soft_colors.png" />
          </IonAvatar>
          <IonLabel style="margin-left: 1em;">
            {{ message.creator }}
          </IonLabel>
        </IonItem>
      </IonCardHeader>
      <IonCardContent @click="openModal(message)">{{ message.topic.text }}</IonCardContent>
    </IonCard>

</template>

<script>
/* eslint-disable vue/no-unused-components */
import {
  IonItem,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonChip,
  IonAvatar, 
  IonCard, 
  IonLabel,
  modalController,
  IonModal,
  IonToolbar,
  IonSearchbar,
  IonBadge,
  IonHeader,
  IonContent,
  IonIcon,
} from '@ionic/vue';

import {defineComponent, reactive, ref} from 'vue';
import { useMatrixClient } from "@/stores/MatrixClient";
import {useCrossPage} from "@/stores/CrossPageUpdates";
import ChatModal from "@/menus/ChatModal.vue";

let client = useMatrixClient();
let crossPage = useCrossPage();

let content = ref({})
let chats = ref({})
let timeline = ref({})

export default {
  name: "ChatItem",
  data() {
    return {
    }
  },
  props: {
    message: Object,
  },
  components: {
    IonCardContent,
    IonAvatar,
    IonItem,
    IonCard,
    IonLabel,
    IonCardHeader,
    modalController,
    IonChip,
    IonModal,
    IonButton,
    IonButtons,
    IonToolbar,
    IonSearchbar,
    IonBadge,
    IonHeader,
    IonContent,
    IonIcon,
  },
  methods: {
    cancel() {
      this.$refs.modal.$el.dismiss(null, 'cancel');
    },
    confirm() {
      const name = this.$refs.input.$el.value;
      this.$refs.modal.$el.dismiss(name, 'confirm');
    },
    onWillDismiss(ev) {
      if (ev.detail.role === 'confirm') {
        return
      }
    },

    async openModal(topic) {
      let thaTopic = topic;
      thaTopic.creator = topic.creator.replace(/:.*/, '');
      const modal = await modalController.create({
        component: ChatModal,
        componentProps: {
          message: thaTopic,
        }
      });
      await modal.present();

      const {data, role} = await modal.onWillDismiss();

      if (role === 'confirm') {
        console.log("sure thing")
      }
    },

    async fetchData() {
      const id = "!" + this.$route.params.id + ":matrix.org";
      setInterval(async () => {
        try {
          content = await client.getChatContent(Object.keys(this.thaTopic))
        } catch {
          return
        }
      }, 2000);
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        const id = "!" + this.$route.params.id + ":matrix.org";
        this.fetchData()
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
}
</script>

<style scoped></style>
