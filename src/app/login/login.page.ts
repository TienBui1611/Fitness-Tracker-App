import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { RegistrationModalComponent } from '../registration-modal/registration-modal.component';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  email: string = "";
  password: string = "";

  constructor(private router: Router, private modalController: ModalController, private sharedService: SharedService) {}

  // Displays the typed email on another screen
  login(email: string) {
    this.sharedService.userEmail = email;
      this.router.navigate(['/dashboard']);
  }

  // Opens modal when Registration is clicked
  async openRegistrationModal() {
    const modal = await this.modalController.create({
      component: RegistrationModalComponent,
      cssClass: 'registration-modal'
    });
    return await modal.present();
  }
}