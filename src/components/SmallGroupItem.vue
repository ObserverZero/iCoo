<template @click="onClick">
  <IonCard>
    <IonCardHeader>
      <IonItem>
        <IonAvatar>
          <img
            alt="hacker factory"
            src="../../public/assets/banners/factory.png"
          />
        </IonAvatar>
        <IonCardTitle style="margin-left: 1em">{{ name }}</IonCardTitle>
      </IonItem>
      <IonCardContent>{{ topic }}</IonCardContent>
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
  IonIcon,
  IonCardContent,
  IonAvatar,
  IonItem,
  IonLabel,
} from "@ionic/vue";
import { planet } from "ionicons/icons";

export default {
  name: "SmallGroupItem",
  setup() {
    return {
      planet,
    };
  },
  components: {
    IonCardSubtitle,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonAvatar,
    IonItem,
    IonLabel,
  },
  props: {
    name: String,
    id: String,
    topic: String,
    handle: String,
  },
  methods: {
    onClick() {
      this.$emit("wow!!!!!", this.id);
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        setInterval(() => {
          return;
        }, 2000);
      },
      {
        immediate: true,
      },
    );
  },
};
</script>

<style scoped></style>
