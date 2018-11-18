import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ToastController,
} from "ionic-angular";
import { AngularFirestore } from '@angular/fire/firestore';

import { Camera, CameraOptions } from "@ionic-native/camera";

import { NgForm } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "page-cadastro-usuario",
  templateUrl: "cadastro-usuario.html"
})
export class CadastroUsuarioPage {
  public fotoPerfil: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toast: ToastController,
    public afAuth: AngularFireAuth,
    public camera: Camera,
    public db: AngularFirestore
  ) {
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
        this.fotoPerfil = base64Image;
      },
      err => {
        // Handle error
      }
    );
  }

  public cadastrar(form: NgForm): void {
    let email = form.value.email;
    let senha = form.value.senha;

    this.afAuth.auth.createUserWithEmailAndPassword(email, senha).then((result) => {

      let id;
      let iduser = result.user.uid;
      let nome = form.value.nome;
      let email = form.value.email;
      let senha = form.value.senha;
      let celular = form.value.celular;

      let usuario = {
        id: new Date().getTime(),
        iduser: iduser,
        nome: nome,
        email: email,
        senha: senha,
        celular: celular,
        foto: this.fotoPerfil
      }

      this.db.collection('usuarios').add(usuario)
        .then((ref) => {
          let id = ref.id;
          this.db.collection('usuarios').doc(id).update({ id: id });
        })

    }).catch((error) => {
      alert(error);
    })
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad CadastroUsuarioPage");
  }
}
