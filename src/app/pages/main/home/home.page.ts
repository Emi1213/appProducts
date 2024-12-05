import { Component, inject, OnInit } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateComponent } from 'src/app/shared/components/add-update/add-update.component';
import { Product } from 'src/app/models/product.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  product: Product;
  firebaseSrvc = inject(FirebaseService);
  utilsSrvc = inject(UtilsService);

  async addUpdateProduct() {
    let succes = await this.utilsSrvc.presentModal({
      component: AddUpdateComponent,
      cssClass: 'add-update-modal',
      componentProps: {},
    });
  }
}
