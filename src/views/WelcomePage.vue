
<template id="yeah">
  <IonPage>
    <IonContent :fullscreen="true">
        <div id="container">hah</div>
    </IonContent>
  </IonPage>

</template>

<script lang="ts">
/* eslint-disable vue/no-unused-components */
import {defineComponent, reactive} from 'vue';
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
}
  from '@ionic/vue';
import {useMatrixClient} from '../stores/MatrixClient.js';
import MainMenu from '@/menus/MainMenu.vue';
import {menu, close, search, personCircle, addCircle} from 'ionicons/icons';

// TODO - Ranking functionality of group membership to curate what appears on top of the list on group profile

const client = useMatrixClient()

export default defineComponent({
  /* eslint-disable vue/no-unused-components */
  name: 'WelcomePage',
  components: {
    IonContent,
    IonPage,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonButtons,
    IonIcon,
    IonMenu,
    IonMenuToggle,
    IonMenuButton,
    IonItem,
  },
  data() {
    return {}
  },
  setup() {
    return {
      menu,
      close,
      personCircle,
      search,
      addCircle,
    }
  },
  methods: {
  },
});
</script>

<style scoped>
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

</style>
