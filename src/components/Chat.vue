<template>
  <IonCard>
    <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png"/>
    <IonCardHeader>
      <IonCardTitle>Group name</IonCardTitle>
      <IonCardSubtitle>&groupname</IonCardSubtitle>
    </IonCardHeader>
  </IonCard>
  <IonList>
    <ChatItem/>
    <ChatItem/>
    <ChatItem/>
  </IonList>
</template>

<script>
import {
  IonItem,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonAvatar
} from '@ionic/vue';
import ChatItem from "@/components/ChatItem";
import {useMatrixClient} from "@/stores/MatrixClient";

let client = useMatrixClient();

export default {
  name: "GroupDisplay",
  components: {
    ChatItem,
    IonCardTitle,
    IonCardSubtitle,
    IonList,
    IonCardHeader,
  },
}
</script>

<style scoped>

</style>
