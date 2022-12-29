<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="calendar" href="/tabs/calendar">
          <IonIcon :icon="calendar" />
        </ion-tab-button>
          
        <ion-tab-button tab="groups" href="/tabs/groups">
          <IonIcon :icon="beer" />
        </ion-tab-button>
        
        <ion-tab-button tab="people" href="/tabs/people">
          <IonIcon :icon="peopleCircle" />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, calendar, peopleCircle, beer } from 'ionicons/icons';

export default defineComponent({
  name: 'TabsPage',
  components: { IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      ellipse, 
      calendar,
      peopleCircle,
      beer
    }
  }
});
</script>
