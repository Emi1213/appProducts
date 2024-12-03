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
        console.log(res);
      }).catch((err)=>{})
    }
  }
}
