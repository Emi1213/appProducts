import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, AlertOptions, LoadingController, LoadingOptions, ModalController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  alertCtrl =  inject(AlertController);
  toastCtrl = inject(ToastController);
  loadingCtrl = inject(LoadingController);
  modalCtrl= inject(ModalController);
  router = inject(Router);


  async presentAlert(opts: AlertOptions) {
    const alert = await this.alertCtrl.create(opts);

    await alert.present();
  }

  presentLoading() {
    return this.loadingCtrl.create({spinner: 'crescent'});
  }

  presentToast(opts: ToastOptions) {
    return this.toastCtrl.create(opts);
  }

  routerLink(url: string){
    this.router.navigateByUrl(url);
  }


  saveInLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getFromLocalStorage(key: string){
    return JSON.parse(localStorage.getItem(key)!);
  }
}
