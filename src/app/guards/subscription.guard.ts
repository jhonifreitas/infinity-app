import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';

import { UtilService } from '../services/util.service';
import { StorageService } from 'src/app/services/storage.service';
import { SubscriptionPage } from '../pages/subscription/subscription.page';
import { SubscriptionService } from '../services/firebase/subscription.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionGuard implements CanActivate {

  constructor(
    private _util: UtilService,
    private _storage: StorageService,
    private popoverCtrl: PopoverController,
    private _subscription: SubscriptionService,
  ){ }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(async resolve => {
      const loader = await this._util.loading('Verificando acesso...');
      const param = route.data.assessmentId;

      await this._subscription.getByStudentId(this._storage.getUser.id).then(_ => {
        loader.dismiss();
        resolve(true);
      }).catch(async _ => {
        loader.dismiss();
        const popover = await this.popoverCtrl.create({component: SubscriptionPage});
        await popover.present();
        const { data } = await popover.onDidDismiss();
        if (data) resolve(true);
        else resolve(false);
      });
    });
  }
}