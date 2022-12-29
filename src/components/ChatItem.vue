<template>
  <IonCard>
    <IonCardContent>
      <IonItem>
        <IonAvatar>
          <img alt="Silhouette of a person's head" src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
        </IonAvatar>
        <IonLabel>
          Dis guys name
        </IonLabel>
      </IonItem>
    </IonCardContent>
    <IonCardContent>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid assumenda doloremque eveniet laudantium quas.
      Adipisci eius inventore itaque iusto numquam porro ratione rem rerum veritatis voluptatibus. A obcaecati qui
      soluta. Et recusandae sunt vel veniam. Alias aut, corporis deleniti expedita harum illo ipsa iure nulla pariatur
      soluta tempore temporibus voluptate.
    </IonCardContent>
  </IonCard>
</template>
<script>
import {
  IonItem,
  IonCardHeader,
  IonCardContent,
  IonList,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonAvatar,
} from '@ionic/vue';

export default {
  name: "ChatItem",
  components: {IonCardContent, IonAvatar, IonItem},
}
</script>

<style scoped></style>
