import { Component, OnInit } from '@angular/core';
import { NavParams, PopoverController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'src/app/models/subscription';

import { UtilService } from 'src/app/services/util.service';
import { StorageService } from 'src/app/services/storage.service';
import { SubscriptionService } from 'src/app/services/firebase/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit {

  isIOS: boolean;
  showAuth = false;
  togglePass = false;
  formGroup: FormGroup;
  
  private data = new Subscription();
  private user = this._storage.getUser;

  constructor(
    private _util: UtilService,
    private navParams: NavParams,
    private _storage: StorageService,
    private formBuilder: FormBuilder,
    private popoverCtrl: PopoverController,
    private _subscription: SubscriptionService
  ) {
    this.formGroup = this.formBuilder.group({
      accessCode: ['', Validators.required],
      client: this.formBuilder.group({
        id: [this.user.id, Validators.required],
        name: [this.user.name, Validators.required]
      }),
      assessment: this.formBuilder.group({
        id: ['', Validators.required],
        name: ['', Validators.required]
      })
    });
  }

  ngOnInit() {
    this.controls.assessment.patchValue(this.navParams.get('assessment'));
  }

  get controls() {
    return this.formGroup.controls;
  }

  async onSubmit() {
    if (this.formGroup.valid) {
      const loader = await this._util.loading('Acessando...');

      Object.assign(this.data, this.formGroup.value);

      await this._subscription.add(this.data).then(id => {
        this.goToBack();
      }).catch(err => this._util.message(err));

      loader.dismiss();
    } else this._util.message('Preencha os dados corretamente antes de prosseguir!');
  }

  goToBack() {
    this.popoverCtrl.dismiss();
  }
}
