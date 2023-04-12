<template>
    <div class="walls" :id="id" :style="{ 'margin-left': indent + '.5em' }">
        <div id="sender">{{ sender }}</div>
            <div id="textContainer">
                {{ text }}
            </div>
            <div id="reply" @click="reply">Reply</div>
        <div id="react"></div>
    </div>
    <div v-if="replying">
        <div class="replyBox" :style="{'margin-left': indent + '.9em'}">
            <IonItem lines="none">
                <IonTextarea :autogrow="true" placeholder="wtf?"></IonTextarea>
                <IonButtons slot="end">
                    <IonButton id="send">
                    <IonIcon :icon="send" color="primary"/>
                    </IonButton>
                </IonButtons>
            </IonItem>
        </div>
    </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import {
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonMenuToggle,
  IonMenuButton,
  IonIcon,
  IonButtons,
  IonButton,
  IonAvatar,
  IonInput,
  IonTextarea,
} from '@ionic/vue';
import {
  send,
} from 'ionicons/icons';
import {defineComponent, ref} from 'vue';
import {useMatrixClient} from "@/stores/MatrixClient";

const client = useMatrixClient()
let wowsers = {}

let senderClean = ref('')

export default {
  name: "ProfilePage",
  data() {
    return {
        replying: false,
        send,
    }
  },
  components: {
    IonItem,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonButtons,
    IonButton,
    IonIcon,
    IonInput,
    IonTextarea,
  },
  props: {
    indent: String,
    sender: String,
    text: String,
    entry: String,
    id: String,
  },
  methods: {
    reply() {
      console.log(this.ident)
      this.replying = true
    },
  }
}
</script>

<style scoped>
.walls {
    background-color: #1e1f1e;
    margin: .5em;
    padding: .6em;
    padding-left: .9em;
    padding-bottom: .3em;
    border-radius: 1em;
}
.replyBox {
    background-color: #1e1f1e;
    margin: .5em;
    margin-right: .9em;
    padding: .2em;
    padding-left: .5em;
    padding-bottom: .3em;
    border-radius: 1em;
}
#sender {
    font-size: .8em;
}
#textContainer {
    margin-top: .3em;
}
#reply {
    margin-top: .4em;
    width: fit-content;
    padding: .3em;
    padding-left: .5em;
    padding-right: .5em;
    border-radius: 1em;;
    font-size: .7em;
    background-color: #2f2f2f;
}
</style>