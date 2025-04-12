import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-registration-modal',
  templateUrl: './registration-modal.component.html',
  styleUrls: ['./registration-modal.component.scss'],
})
export class RegistrationModalComponent implements OnInit {
  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  // Dismiss the modal without registration
  dismiss() {
    this.modalController.dismiss();
  }

  // After completed registration, dismiss the modal
  async register() {
    await this.modalController.dismiss();
  }
}