<template id="yeah">
  <IonPage>
    <IonHeader>
      <p style="padding-top: 1.2em;"/>
    </IonHeader>
    <IonContent :fullscreen="true">

      <div v-for="(value, name) in people" :key="name">
        <ProfileItem :profile="value"></ProfileItem>
      </div>

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
  IonButtons, IonCardContent,
}
  from '@ionic/vue';
import {useMatrixClient} from '../stores/MatrixClient.js';
import ProfileItem from "@/components/ProfileItem.vue";
import Profile from "@/views/MyProfile.vue";
import {menu, close, search, personCircle, addCircle} from 'ionicons/icons';

// TODO - Ranking functionality of group membership to curate what appears on top of the list on group profile
// TODO - Facebook's relationhsip status equivalent - am I available for work

const client = useMatrixClient()

let people = reactive({})
let peopleArray = []

setInterval(async () => {
  peopleArray = await client.getAllUsers()
  Object.assign(people, peopleArray)
}, 1000)

let oldScrollY = window.scrollY;
window.onscroll = function (e) {
  if (oldScrollY < window.scrollY) {
    console.log("Down")
  } else {
    console.log("Up")
  }
  oldScrollY = window.scrollY
}

export default defineComponent({
  name: 'PeoplePage',
  components: {
    IonContent,
    IonPage,
    IonList,
    ProfileItem,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonButtons,
    IonIcon,
  },
  data() {
    return {
      people,
    }
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
</style>
