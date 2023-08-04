<template>
  <IonPage>
    <IonHeader>
      <p style="padding-top: .8em;"/>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonItem>
        <IonLabel>
          8 May 2023
        </IonLabel>
      </IonItem>
        <IonList>
          <CalendarItem name="Coming up!" id="sowhat"/>
          <CalendarItem name="Coming up!" id="sowhat"/>
        </IonList>
      <IonItem>
        <IonLabel>
          19 May 2023
        </IonLabel>
      </IonItem>
      <IonList>
        <CalendarItem name="Coming up!" id="sowhat"/>
        <CalendarItem name="Coming up!" id="sowhat"/>
        <CalendarItem name="Coming up!" id="sowhat"/>
      </IonList>
    </IonContent>
  </IonPage>

</template>

<script>
/* eslint-disable vue/no-unused-components */
import {defineComponent, reactive} from 'vue'
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  modalController,
  IonButton,
  IonMenu,
  IonMenuToggle,
  IonIcon,
  IonMenuButton,
  IonThumbnail,
  IonButtons,
  IonItem,
  IonLabel,
} from '@ionic/vue'
import {useMatrixClient} from '../stores/MatrixClient.js'
import CalendarItem from '@/components/CalendarItem.vue';
import {
  menu, 
  close, 
  search, 
  personCircle, 
  addCircle
} from 'ionicons/icons'

// TODO - Ranking functionality of group membership to curate what appears on top of the list on group profile

const client = useMatrixClient()

let groups = reactive({})

export default defineComponent({
  /* eslint-disable vue/no-unused-components */
  name: 'CalendarPage',
  components: {
    IonContent,
    IonPage,
    IonList,
    IonHeader,
    IonToolbar,
    IonLabel,
    IonTitle,
    IonButton,
    IonButtons,
    IonIcon,
    IonMenu,
    IonMenuToggle,
    IonMenuButton,
    IonItem,
    CalendarItem,
  },
  data() {
    return {
      groups,
    }
  },
  setup() {
    return {
      menu,
      close,
      personCircle,
      search,
      addCircle,
    }
  },
  methods: {
    fetchCalendarItems() {
        return 
    },
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {
        setInterval(() => {
          Object.assign(groups, client.getGroups())
        }, 5000)
        Object.assign(groups, client.getGroups())
        console.log(groups)
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: true }
    )
  },
})
</script>

<style scoped>
</style>
