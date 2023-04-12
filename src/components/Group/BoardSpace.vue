<template>
  <IonList>
    <IonItem>So board right now</IonItem>
  </IonList>
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
} from '@ionic/vue';

export default {
  name: "BoardSpace",
  setup() {
    return {}
  },
  components: {IonCardSubtitle, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonList},
  props: {},
  methods: {}
}

</script>

<style scoped>
</style>
