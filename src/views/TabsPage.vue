<template>
  <IonPage>
    <IonMenu content-id="main-content" type="overlay">
      <IonContent>
        <IonItem></IonItem>
        <IonItem>
          <IonButton fill="clear" href="/tabs/myprofile" size="large">
            <img id="avatarMenu" alt="Silhouette of a person's head" src="../../public/assets/banners/hacker_soft_colors.png"/>
            <!-- <IonLabel style="padding-left: .5em;">{{ globalProfile.handle }}</IonLabel> -->
          </IonButton>
        </IonItem>
        <IonItem>
          <IonButton fill="clear" href="/tabs/profile" size="large">
            <IonIcon :icon="logIn" size="large"/>
            <IonLabel style="padding-left: .5em;">Log In</IonLabel>
          </IonButton>
        </IonItem>
        <IonItem>
          <IonButton fill="clear" href="/tabs/profile" size="large">
            <IonIcon :icon="logOut" size="large"/>
            <IonLabel style="padding-left: .5em;">Log Out</IonLabel>
          </IonButton>
        </IonItem>
        <IonItem>
          <IonButton fill="clear" href="/tabs/profile" size="large">
            <IonIcon :icon="chatbox" size="large"/>
            <IonLabel style="padding-left: .5em;">Messages</IonLabel>
          </IonButton>
        </IonItem>
        <IonItem>
          <IonButton fill="clear" href="/tabs/profile" size="large">
            <IonIcon :icon="cog" size="large"/>
            <IonLabel style="padding-left: .5em;">Settings</IonLabel>
          </IonButton>
        </IonItem>
        <IonItem>
          <IonToggle :checked="joinedSearchable"></IonToggle>
            <IonLabel style="padding-left: .5em;">Searchable</IonLabel>
        </IonItem>
      </IonContent>
    </IonMenu>
    <IonHeader :translucent="false">
      <div id="main-content">
        <IonToolbar>
          <IonMenuToggle auto-hide="false" slot="start">
            <img id="avatarBar" alt="Silhouette of a person's head" src="../../public/assets/banners/hacker_soft_colors.png"/>
          </IonMenuToggle>
          <IonTitle>iCoo</IonTitle>
          <IonButtons slot="end">
            <IonButton>
              <IonIcon :icon="search" color="tertiary" size="large"/>
            </IonButton>
            <IonButton href="/tabs/notifications">
              <IonIcon :icon="notifications" color="tertiary"/>
              <IonBadge slot="end" color="danger">22</IonBadge>
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </div>
    </IonHeader>
    <IonTabs>
      <IonRouterOutlet></IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="calendar" href="/tabs/calendar">
          <IonIcon :icon="calendarClear" size="large"/>
        </IonTabButton>

        <IonTabButton tab="groups" href="/tabs/groups">
          <IonIcon :icon="colorFilterSharp" size="large"/>
        </IonTabButton>

        <IonTabButton tab="people" href="/tabs/people">
          <IonIcon :icon="peopleCircle" size="large"/>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </IonPage>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import {defineComponent, reactive, ref} from 'vue';
import {
  IonHeader,
  IonMenu,
  IonMenuToggle,
  IonMenuButton,
  IonButtons,
  IonButton,
  IonToolbar,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonContent,
  IonItem,
  IonSearchbar,
  IonBadge, 
  IonLabel,
  IonToggle,
} from '@ionic/vue';
import {
  ellipse,
  calendarClear,
  peopleCircle,
  beer,
  menu,
  close,
  search,
  notifications,
  personCircle,
  addCircle,
  colorFilterSharp, 
  logIn, 
  chatbox, 
  cog,
  logOut,
} from 'ionicons/icons';
import sdk, {EventType} from 'matrix-js-sdk'
import { convertCompilerOptionsFromJson } from 'typescript'

//// TODO: switch logo for a search bar with the logo name inside as suggested text
//// TODO: get rid of menu button and replace with the avatar for same function.

export default defineComponent({
  name: 'TabsPage',
  components: {
    IonHeader,
    IonMenuToggle,
    IonMenuButton,
    IonButtons,
    IonButton,
    IonToolbar,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonItem,
    IonRouterOutlet,
    IonMenu,
    IonTitle,
    IonContent,
    IonSearchbar,
    IonBadge,
    IonLabel,
    IonToggle,
  },
  data() {
    let switchable = ref('')
    switchable = "nope"
    let joinedSearchable = false;
    let profile = ref('')
    //profile = getOwnProfile()
    return {
      joinedSearchable,
      profile,
      switchable,
      //globalProfile,
    }
  },
  setup() {
    return {
      ellipse,
      calendarClear,
      peopleCircle,
      personCircle,
      beer,
      search,
      notifications,
      addCircle,
      colorFilterSharp,
      logIn,
      chatbox,
      cog,
      logOut,
    }
  },
  methods: {
    fetchData() {
      //this.profile = getProfile()
    },
    switchData() {
      if (this.switchable === "nope") {
        this.switchable = "yep"
      } else {
        this.switchable = "nope"
      }
    }
  },
  created() {
    this.$watch(
        () => this.$route.params,
        () => {
            this.fetchData()
            this.switchData()
        },
        {immediate: true}
    )
  },
});
</script>
<style scoped>
.i {
  position: relative;
  bottom: 3.5px;
}
#avatarBar {
  width: 2em;
  margin-left: 1em;
  margin-top: .4em;
  border-radius: 1em;
}
#avatarMenu {
  width: 2em;
  border-radius: 1em;
}
</style>

