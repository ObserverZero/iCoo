<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Calendar</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">

      <IonList v-for="(value, name) in groups" :key="name">
        <CalendarItem :name="value.name" :id="value.id"/>
      </IonList>

    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonList, } from '@ionic/vue';
import { useMatrixClient } from '../stores/MatrixClient.js';
import CalendarItem from "@/components/CalendarItem.vue";

const client = useMatrixClient()
let groups = reactive({})

setInterval(() => {
  Object.assign(groups, client.getGroups())
}, 1000)

export default defineComponent({
  name: 'CalendarPage',
  components: {CalendarItem, IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonList, },
  data() {
    return {
      groups: groups,
    }
  },
});
</script>
