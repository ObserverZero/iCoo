<template @click="onClick">
  <IonCard>
    <IonCardHeader>
      <IonCardTitle>&{{ name }}</IonCardTitle>
      <IonCardContent>{{ topic }}</IonCardContent>
      <p/>
      <IonIcon :icon="planet"/>
    </IonCardHeader>
  </IonCard>
</template>

<script>
import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  IonCardContent,
} from '@ionic/vue';
import {planet} from 'ionicons/icons';

export default {
  name: "GroupItem",
  setup() {
    return {
      planet,
    }
  },
  components: {IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent},
  props: {
    name: String,
    id: String,
    topic: String,
  },
  methods: {
    onClick() {
      this.$emit('wow!!!!!', this.id)
    }
  }
}

</script>

<style scoped>
</style>
