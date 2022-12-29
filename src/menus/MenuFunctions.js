export { openModal }

import Modal from '../menus/Modal.vue';
import ModalController from '@ionic/vue'

async function openModal(modal) {
  modal = await ModalController.create({
    component: Modal,
  });
  modal.present();

  const { data, role } = await modal.onWillDismiss();

  if (role === 'confirm') {
    console.log("sure thing")
  }
}