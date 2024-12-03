import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.interface';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage {
  protected isModal: boolean = false;

  group = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  firebaseSrvc = inject(FirebaseService);
  utilsSrvc = inject(UtilsService);

  async submit() {
    if (this.group.valid) {
      const loading = await this.utilsSrvc.presentLoading();
      loading.present();
      this.firebaseSrvc
        .signUp(this.group.value as User)
        .then(async (res) => {
          await this.firebaseSrvc.updateUser(this.group.value.name);
          let uid = res.user.uid;
          this.group.controls.uid.setValue(uid);
          this.setUserInfo(uid);
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

  async setUserInfo(uid: string) {
    if (this.group.valid) {
     const loading = await this.utilsSrvc.presentLoading();
      loading.present();
      let path = `users/${uid}`;
      delete this.group.value.password;
      this.firebaseSrvc.setDocumet(path, this.group.value).then((res) => {
        this.utilsSrvc.saveInLocalStorage('user', this.group.value);
        this.utilsSrvc.routerLink('main/home')
      }).catch((err) => {
        this.utilsSrvc.presentToast({
          message: err.message,
          color: 'danger',
          position: 'top',
          duration: 2000,
          icon: 'alert-circle-outline',
        });
      }).finally(() => {
        loading.dismiss();
      });
    }
  }
}
