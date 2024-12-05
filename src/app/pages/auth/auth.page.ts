import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { User } from 'src/app/models/user.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage {
  protected isModal: boolean = false;
  group = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  firebaseSrvc = inject(FirebaseService);
  utilsSrvc = inject(UtilsService);


  constructor() {}

  submit(){

    if(this.group.valid){
      this.firebaseSrvc.signIn(this.group.value as User).then((res)=>{
        this.utilsSrvc.presentToast({
          message: ` Welcome ${res.user.displayName}`,
          color: 'success',
          position: 'top',
          duration: 2000,
          icon: 'checkmark-circle-outline',
        });
        this.getUserInfo(res.user.uid);
      }).catch((err)=>{
        this.utilsSrvc.presentToast({
          message: err.message,
          color: 'danger',
          position: 'top',
          duration: 2000,
          icon: 'alert-circle-outline',
        });
      })
    }
  }

  async getUserInfo(uid:string){
    if(this.group.valid){
      const loading = await this.utilsSrvc.presentLoading()
      loading.present();
      let path = `users/${uid}`;
      this.firebaseSrvc.getDocumet(path).then((res)=>{
        this.utilsSrvc.saveInLocalStorage('user', res);
        this.utilsSrvc.routerLink('main/home');
      })
      .catch((err)=>{

      })
      .finally(()=>{
        loading.dismiss();
      })
    }
  }
}
