<template>
    <div>{{ profile.displayname }}</div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonMenuToggle,
  IonMenuButton,
  IonAvatar,
  IonIcon,
} from '@ionic/vue';
import {defineComponent} from 'vue';
import {useMatrixClient} from '@/stores/MatrixClient.js';

const client = useMatrixClient()

export default {
  name: "ProfileDisplayInMenu",
  data() {
    let profile = client.getOwnProfile()
    return {
      profile
    }
  },
  components: {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
  }
}
</script>

<style scoped>

</style>