<template>
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>{{ name }} and something else</IonCardTitle>
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
} from '@ionic/vue';

import {useMatrixClient} from "@/stores/MatrixClient";

let client = useMatrixClient();

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

