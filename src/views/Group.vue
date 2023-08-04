<template itd="yeah">
  <IonPage ref="page">
    <IonHeader>
      <p style="padding-top: 1.2em;"/>
    </IonHeader>
    <IonContent>

      <IonCard>
        <img :alt="topicBanner" :src="getImgUrl(topicBanner)" />
        <IonCardHeader>
          <div v-if="room != undefined">
            <IonCardTitle>{{ room.name }}</IonCardTitle>
          </div>
          <IonCardSubtitle>&{{ $route.params.id }}</IonCardSubtitle>
          <IonLabel>{{ topicText }}</IonLabel>
        </IonCardHeader>
        <IonSegment
            value="groups"
            @ionChange="segmentChanged($event)"
            v-model="content.content">
          <IonSegmentButton value="groups">
            <IonIcon :icon="calendarClear" color="tertiary"/>
          </IonSegmentButton>
          <IonSegmentButton value="chat">
            <IonIcon :icon="chatbox" color="tertiary"/>
          </IonSegmentButton>
          <IonSegmentButton value="board">
            <IonIcon :icon="clipboard" color="tertiary"/>
          </IonSegmentButton>
        </IonSegment>
      </IonCard>

      <div v-if="content.content === 'chat'">
        <ChatSpace :messages="messages"/>
      </div>
      <div v-else-if="content.content === 'board'">
        <BoardSpace/>
      </div>
      <div v-else-if="content.content === 'groups'">
        <GroupSpace :groups="groups"/>
      </div>

    </IonContent>
  </IonPage>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import {
  IonItem,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonButton,
  IonButtons,
  IonCardTitle,
  IonAvatar,
  IonToggle,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonCard,
  IonIcon,
  IonFab,
  IonFabButton,
  modalController,
  IonFabList,
  IonPage,
  IonHeader,
  IonContent,
  IonFooter,
  IonImg,
} from '@ionic/vue';
import {
  add,
  addCircle,
  chatbox,
  clipboard,
  calendarClear,
  colorFilterSharp,
} from 'ionicons/icons';
import {defineComponent, reactive, ref} from 'vue';
import {useMatrixClient} from "@/stores/MatrixClient";
import ChatModal from '@/menus/ChatModal.vue';
import ChatItem from '@/components/ChatItem.vue';
import ChatSpace from "@/components/Group/ChatSpace.vue";
import BoardSpace from "@/components/Group/BoardSpace.vue";
import GroupSpace from "@/components/Group/GroupSpace.vue";

let client = useMatrixClient();

let address = ref("")
let children = ref({})
let state = ref({})
let chat = ref({})
let board = ref({})
let internalRooms = ref({})
let memberRooms = ref({})
let timeline = ref({})
let content = ref({})


export default defineComponent({
  name: "GroupPage",
  setup() {
    return {
      clipboard,
      calendarClear,
      addCircle,
      chatbox,
      add,
      colorFilterSharp,
    }
  },
  data() {
    let room = ref({
      name: 'shit',
      banner: 'group'
    })
    let topicText = ref('')
    let topicBanner = ref('group')
    let name = ref('')
    let topic = ref('')
    let content = reactive({
      content: 'chat'
    })
    let messages = ref({})
    let groups = ref({})
    address = "!" + this.$route.params.id + ":matrix.icoo.org"
    return {
      room,
      content,
      address,
      children,
      topicText,
      topicBanner,
      messages,
      groups,
    }
  },
  components: {
    ChatItem,
    GroupSpace,
    BoardSpace,
    ChatSpace,
    IonItem,
    IonContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonButton,
    IonButtons,
    IonCardTitle,
    IonAvatar,
    IonToggle,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    IonCard,
    IonIcon,
    IonFab,
    IonFabButton,
    modalController,
    IonFabList,
    IonPage,
    IonHeader,
    IonFooter,
    IonImg,
  },
  props: {
    name: String,
    groupId: String,
    topic: Object,
  },
  methods: {
    getImgUrl(bannerName) {
      var images = require.context('../../public/assets/banners', false, /\.png$/)
      return images('./' + bannerName + ".png")
    },
    async openModal() {
      const modal = await modalController.create({
        component: ChatModal,
        componentProps: {
          groupId: this.groupId,
        }
      });
      return await modal.present();
    },
    segmentChanged(event) {
      this.content.content = event.detail.value;
    },
    async fetchData() {
      const id = "!" + this.$route.params.id + ":matrix.icoo.org";
      setInterval(async () => {
        try {
          this.room = await client.getRoomById(id)
          this.topicText = this.room.topic.text
          this.topicBanner = this.room.topic.banner
          children = client.getGroupContent(address)
          this.messages = client.getChatContent(id)
          this.groups = client.getSubgroupContent(id)
          console.log(this.messages)
        } catch {
          return
        }
      }, 2000);
    },
  },
  created() {
    this.$watch(
        () => this.$route.params,
        () => {
          this.fetchData()
        },
        // fetch the data when the view is created and the data is
        // already being observed
        {immediate: true}
    )
  },
})
</script>

<style scoped>

</style>
