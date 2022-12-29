<template>
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>{{ name }}</IonCardTitle>
      <IonCardContent>yoyoyo</IonCardContent>
    </IonCardHeader>
  </IonCard>
</template>

<script>
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
} from '@ionic/vue';

export default {
  name: "GroupItem",
  components: {IonCard, IonCardHeader, IonCardTitle,},
  props: {
    name: String,
    id: String,
  }
}

</script>

<style scoped>

</style>
