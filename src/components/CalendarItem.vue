<template>
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>{{ name }}</IonCardTitle>
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
  name: "CalendarItem",
  components: {IonCard, IonCardHeader, IonCardTitle,},
  props: {
    name: String,
    id: String,
  }
}

</script>

<style scoped>

</style>

