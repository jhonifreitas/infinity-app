import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController, Platform } from '@ionic/angular';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { Student } from 'src/app/models/student';

import { UtilService } from 'src/app/services/util.service';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from 'src/app/services/firebase/auth.service';
import { StudentService } from 'src/app/services/firebase/student.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss']
})
export class ProfilePage implements OnInit {

  data: Student;
  isCordova: boolean;
  formGroup: FormGroup;

  private camOptions: CameraOptions = {
    quality: 90,
    correctOrientation: true,
    mediaType: this.camera.MediaType.PICTURE,
    encodingType: this.camera.EncodingType.JPEG,
    destinationType: this.camera.DestinationType.FILE_URI,
  };

  constructor(
    private camera: Camera,
    private webview: WebView,
    private platform: Platform,
    private _util: UtilService,
    private _auth: AuthService,
    private navCtrl: NavController,
    private _student: StudentService,
    private _storage: StorageService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private actionSheetCtrl: ActionSheetController
  ) {
    this.isCordova = this.platform.is('cordova');
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, this.validatorName]],
      phone: ['', [Validators.required, Validators.minLength(14)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async ngOnInit() {
    const loader = await this._util.loading();
    this.setData();
    loader.dismiss();
  }

  get controls() {
    return this.formGroup.controls;
  }

  setData() {
    this.data = this._storage.getUser;
    this.formGroup.patchValue(this.data);
  }

  validatorName(control: AbstractControl) {
    let error: {invalid: boolean} = null;
    const value: string = control.value || '';
    const nameList = value.split(' ');
    if (nameList.length < 2 || !nameList[1]) error = {invalid: true};
    return error;
  }

  async choiceMedia() {
    return new Promise(async (resolve, reject) => {
      if (this.platform.is('cordova')) {
        const action = await this.actionSheetCtrl.create({
          header: 'Escolha uma da opções',
          buttons: [
            {
              text: 'Galeria',
              role: 'destructive',
              icon: 'images',
              handler: () => {
                this.camOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
                resolve(true);
              }
            }, {
              text: 'Câmera',
              role: 'destructive',
              icon: 'camera',
              handler: () => {
                this.camOptions.sourceType = this.camera.PictureSourceType.CAMERA;
                resolve(true);
              }
            }
          ]
        });
        action.present();
      } else {
        reject();
        this._util.message('Plataforma não suportada!');
      }
    });
  }

  takePhoto() {
    this.choiceMedia().then(async _ => {
      const loader = await this._util.loading('Carregando imagem...');
      await this.camera.getPicture(this.camOptions).then(async (path) => {
        this.data.image = this.webview.convertFileSrc(path) || null;
        const image = await this._util.fileToBlob(path, 'image/png');
        await this._student.uploadImage(this.data.id, image.file);
      }).catch(() => {});
      loader.dismiss();
    }).catch(_ => {});
  }

  async uploadPWA(inputEvent: Event) {
    const loader = await this._util.loading('Carregando imagem...');
    const file: Blob = (inputEvent.target as HTMLInputElement).files[0];
    const reader = new FileReader();

    reader.addEventListener('load', async event => {
      const base64 = event.target.result as string;
      this.data.image = base64;
      await this._student.uploadImage(this.data.id, file);
      loader.dismiss();
    });
    reader.readAsDataURL(file);
  }

  async onSubmit() {
    if (this.formGroup.valid) {
      const loader = await this._util.loading('Criando...');
      Object.assign(this.data, this.formGroup.value);

      await this._student.update(this.data.id, this.data).then(_ => {
        this.goToNext();
        this._util.message('Perfil salvo!');
      }).catch(err => this._util.message(err));

      loader.dismiss();
    } else this._util.message('Preencha os dados corretamente antes de prosseguir!');
  }

  logout() {
    this._auth.signOut();
  }

  goToNext() {
    const returnUrl = this.activatedRoute.snapshot.paramMap.get('returnUrl');
    if (returnUrl) this.navCtrl.navigateBack(returnUrl);
  }
}
