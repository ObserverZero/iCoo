<template id="yeah">
  <IonPage>
    <IonHeader>
      <p style="padding-top: 1.2em;"/>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonCard>
        <img alt="Hacker office" src="../../public/assets/banners/hacker_factory_semi_B&W.png"/>
        <IonCardHeader>
          <IonAvatar style="margin-left: 33%;margin-top: -7em;stroke-width: 10px;width:35%;">
            <img alt="Silhouette of a person's head" src="../../public/assets/banners/hacker_soft_colors.png"/>
          </IonAvatar>
          <IonCardTitle>{{ globalProfile.displayname }}</IonCardTitle>
          <IonCardSubtitle>{{ globalProfile.handle }}</IonCardSubtitle>
          <IonCardContent>
            <div v-for="item in globalProfile.hashtags" v-bind:key="item">
              <IonChip>#{{ item }}</IonChip>
            </div>
            <IonItem>{{ globalProfile.text }}</IonItem>
          </IonCardContent>
        </IonCardHeader>
      </IonCard>
    </IonContent>
  </IonPage>

</template>

<script lang="ts">
/* eslint-disable vue/no-unused-components */
import {defineComponent, reactive} from 'vue';
import {
  IonChip,
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  modalController,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonAvatar,
  IonList,
  IonTitle,
  IonButton,
  IonMenu,
  IonMenuToggle,
  IonIcon,
  IonMenuButton,
  IonThumbnail,
} from '@ionic/vue';
import {useMatrixClient} from '../stores/MatrixClient.js';
import {menu, close, search, personCircle, addCircle} from 'ionicons/icons';

const client = useMatrixClient()
let globalProfile = reactive({
  handle: '',
  displayname: '',
  hashtags: [],
  text: '',
})

async function getProfile() {
  let profile = await client.getOwnProfile()
  globalProfile.handle = profile.handle
  globalProfile.displayname = profile.displayname.name
  globalProfile.hashtags = profile.displayname.hashtags
  globalProfile.text = profile.displayname.text
  console.log(profile)
  return profile
}

setInterval(() => {
  getProfile()
  console.log(client.accountData('m.email'))
}, 5000)

export default defineComponent({
  name: 'ProfilePage',
  components: {
    IonHeader,
    IonToolbar,
    IonContent,
    IonPage,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonAvatar,
    IonChip,
  },
  data() {
    return {
      globalProfile,
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
ion-avatar {
  height: auto;
}
</style>