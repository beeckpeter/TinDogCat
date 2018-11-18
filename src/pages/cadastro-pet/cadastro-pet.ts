import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { NgForm } from "@angular/forms";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
import { Camera, CameraOptions } from "@ionic-native/camera";

import { MeusPetsPage } from '../meus-pets/meus-pets';

@Component({
  selector: "page-cadastro-pet",
  templateUrl: "cadastro-pet.html"
})
export class CadastroPetPage {
  public fotoPetNew: any;
  public dadosPet: any = null;
  atualizacao: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFirestore,
    public afAuth: AngularFireAuth,
    public camera: Camera
  ) {
    this.dadosPet = this.navParams.data.dadosPet || {};
    if (this.dadosPet.id != null) {
      this.atualizacao = 1;
    } else {
      this.atualizacao = 0;
    }
    console.log(this.atualizacao)
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
        this.fotoPetNew = base64Image;
      },
      err => {
        // Handle error
      }
    );
  }

  public cadastrarPet(form: NgForm): void {
    let id = form.value.id;
    let nomepet = form.value.nomepet;
    let tipopet = form.value.tipopet;
    let sexo = form.value.sexo;
    let descricao = form.value.descricao;

    if (this.atualizacao == 0) {
      let pet = {
        id: new Date().getTime(),
        idusuario: this.afAuth.auth.currentUser.uid,
        nomepet: nomepet,
        tipopet: tipopet,
        sexo: sexo,
        descricao: descricao,
        fotoPet: this.fotoPetNew
      }
      this.db.collection('pets').add(pet)
        .then((ref) => {
          let id = ref.id;
          this.db.collection('pets').doc(id).update({ id: id });
        })
      this.navCtrl.push(MeusPetsPage);
    } else {
      console.log('aqui')
      this.db.collection('pets').doc<any>(id).update({
        id,
        nomepet: nomepet,
        tipopet: tipopet,
        sexo: sexo,
        descricao: descricao,
        fotoPet: this.fotoPetNew
      })
      this.navCtrl.push(MeusPetsPage);
    }
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CadastroUsuarioPage");
  }
}
