import {useMatrixClient} from "@/stores/MatrixClient";
import {modalController} from "@ionic/vue";
import Modal from "@/menus/Modal.vue";

let client = useMatrixClient();


setInterval(({groups, seconds}) => {
  Object.assign(groups, client.getGroups())
}, 10000)

export async function openModal() {
  const modal = await modalController.create({
    component: Modal,
  });
  await modal.present();

  const {data, role} = await modal.onWillDismiss();

  if (role === 'confirm') {
    console.log("sure thing")
  }
}
