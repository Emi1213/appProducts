import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage  {

  constructor() { }

  protected isModal: boolean = false;

  group = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  firebaseSrvc = inject(FirebaseService);
  utilsSrvc = inject(UtilsService);

  async submit() {
    if (this.group.valid) {
      const loading = await this.utilsSrvc.presentLoading();
      loading.present();
      this.firebaseSrvc
        .sendResetPasswordEmail(this.group.value.email)
        .then(()=> {
          this.utilsSrvc.presentToast({
            message: 'Check your email to reset your password',
            color: 'success',
            position: 'top',
            duration: 2000,
            icon: 'checkmark-circle-outline',
          });
          this.utilsSrvc.routerLink('/auth');
        })
        .catch((err) => {
          this.utilsSrvc.presentToast({
            message: err.message,
            color: 'danger',
            position: 'top',
            duration: 2000,
            icon: 'alert-circle-outline',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }



}
