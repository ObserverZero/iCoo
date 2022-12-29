<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <ion-title>People</ion-title>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">

      <IonList v-for="(value, name) in groups" :key="name">
        <PeopleItem :name="value.name" :id="value.id"/>
      </IonList>

    </IonContent>
  </IonPage>
</template>

<script lang="ts">
/* eslint-disable vue/no-unused-components */
import { defineComponent, reactive } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList } from '@ionic/vue';
import { useMatrixClient } from '../stores/MatrixClient.js';
import PeopleItem from "@/components/PeopleItem.vue";

const client = useMatrixClient()
let groups = reactive({})

setInterval(() => {
  Object.assign(groups, client.getGroups())
}, 1000)

export default defineComponent({
  name: 'PeoplePage',
  components: {PeopleItem, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList },
  data() {
    return {
      groups: groups,
    }
  }
});
</script>
