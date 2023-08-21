<template @click="onClick">
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>{{ name }}</IonCardTitle>
      <IonCardSubtitle>&{{ handle }}</IonCardSubtitle>
      <IonCardContent>{{ topic }}</IonCardContent>
    </IonCardHeader>
  </IonCard>
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
} from '@ionic/vue';
import {defineComponent, ref} from 'vue'
import {planet} from 'ionicons/icons';

let content = ref('')


export default {
  name: "DiscoveryGroupItem",
  setup() {
    return {
      planet,
    }
  },
  data() {
    return {
    }
  },
  components: {
    IonCardSubtitle, 
    IonIcon, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle, 
    IonCardContent
  },
  props: {
    name: String,
    id: String,
    topic: String,
    handle: String,
    banner: String,
  },
  methods: {
    onClick() {
      this.$emit('wow!!!!!', this.id)
    },
    showContents() {
      setInterval(() => {
        console.log(this.topic)
        console.log("wut")
      }, 1000)
    },
    getImgUrl(bannerName) {
      var images = require.context('../../public/assets/banners', false, /\.png$/)
      return images('./' + bannerName + ".png")
    },
  }
}

</script>
<style scoped>
</style>
