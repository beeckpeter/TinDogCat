import { Component } from "@angular/core";
import {
  NavController,
  ToastController
} from "ionic-angular";
import { Observable } from "rxjs";

import { Camera, CameraOptions } from "@ionic-native/camera";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';

import { NgForm } from "@angular/forms";

@Component({
  selector: "page-perfil",
  templateUrl: "perfil.html"
})
export class PerfilPage {
  public listagem: Observable<any[]>;
  public fotoPerfilNew: any;
  public uiduser: string;

  constructor(
    public navCtrl: NavController,
    private db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private toastCtrl: ToastController,
    public camera: Camera
  ) {
    this.uiduser = this.afAuth.auth.currentUser.uid;
    this.listagem = db.collection<any>("usuarios").valueChanges();
    this.fotoPerfilNew = null;
  }

  abreCamera() {
    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 400,
      targetHeight: 600,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(
      imageData => {
        let base64Image = "data:image/jpeg;base64," + imageData;
        this.fotoPerfilNew = base64Image;
      },
      err => {
        // Handle error
      }
    );
  }
  public editar(form: NgForm): void {

    let id = form.value.id;
    let nome = form.value.nome;
    let celular = form.value.celular;

    if (this.fotoPerfilNew == null) {
      this.db.collection('usuarios').doc<any>(id).update({
        id,
        nome: nome,
        celular: celular
      })
      this.navCtrl.pop();
      let toastEditar = this.toastCtrl.create({
        message: 'Alterado com sucesso!',
        duration: 2000,
      });
      toastEditar.present();
    } else {
      this.db.collection('usuarios').doc<any>(id).update({
        id,
        nome: nome,
        celular: celular,
        foto: this.fotoPerfilNew
      })
      let toastEditar = this.toastCtrl.create({
        message: 'Alterado com sucesso!',
        duration: 2000,
      });
      toastEditar.present();
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad PerfilPage");
  }
}
