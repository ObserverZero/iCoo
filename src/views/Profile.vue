<template>
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>Yo Man</IonCardTitle>
      <IonCardSubtitle>@yoman</IonCardSubtitle>
      <IonCardContent>Activist</IonCardContent>
    </IonCardHeader>
  </IonCard>
</template>

<script>
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonMenuToggle,
  IonMenuButton,
  IonAvatar,
  IonIcon
} from '@ionic/vue';

export default {
  name: "ProfilePage",
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
