import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from "rxjs";
import { CadastroPetPage } from "../cadastro-pet/cadastro-pet";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: "page-meus-pets",
  templateUrl: "meus-pets.html"
})
export class MeusPetsPage {
  public idUsuario: string;
  private lista: Array<any> = [];
  public listagem: Observable<any[]>;

  constructor(
    private navCtrl: NavController,
    private db: AngularFirestore,
    public afAuth: AngularFireAuth,
    private toastCtrl: ToastController
  ) {
    this.idUsuario = this.afAuth.auth.currentUser.uid;

    console.log(this.idUsuario);

    this.listagem = db.collection<any>("pets", ref => ref.where("idusuario", "==", this.idUsuario)).valueChanges();
  }

  public editar(p: any): void {
    this.navCtrl.push(CadastroPetPage, { dadosPet: p });
  }

  public excluir(id: string): void {
    this.db.collection('pets').doc(id).delete();
    let toast = this.toastCtrl.create({
      message: 'Apagado com sucesso!',
      duration: 2000
    });
    toast.present();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad MeusPetsPage");
  }
}
