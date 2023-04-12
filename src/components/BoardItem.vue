
<template>
  <IonCard>
    <IonCardHeader>
      <IonAvatar>
        <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
      </IonAvatar>
      <IonLabel>
        Dis guys name
      </IonLabel>
    </IonCardHeader>
    <IonCardContent>{{ message }}</IonCardContent>
  </IonCard>
</template>
<script>
/* eslint-disable vue/no-unused-components */
import {
  IonItem,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonAvatar, IonCard, IonLabel,
} from '@ionic/vue';

export default {
  name: "BoardItem",
  props: {
    message: String,
  },
  components: {
    IonCardContent,
    IonAvatar,
    IonItem,
    IonCard,
    IonLabel,
    IonCardHeader
  },
}
</script>

<style scoped></style>
