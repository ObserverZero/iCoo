<template>
    <IonCard href="/tabs/myprofile">
      <IonCardHeader>
        <IonCardTitle>{{ profile.displayName }}</IonCardTitle>
        <IonCardContent>{{ profile.userId }}</IonCardContent>
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
  IonCardContent,
  IonItem,
} from '@ionic/vue';

export default {
  name: "GroupItem",
  components: {
    IonItem, 
    IonCard, 
    IonCardHeader, 
    IonCardTitle,
    IonCardContent,
  },
  props: {
    profile: Object,
  },
}
</script>

<style scoped>

</style>
