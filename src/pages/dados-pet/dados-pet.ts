import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { Observable } from "rxjs";

import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: "page-dados-pet",
  templateUrl: "dados-pet.html"
})
export class DadosPetPage {
  public dados: any;
  public listagemUsuario: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFirestore,
    public afAuth: AngularFireAuth
  ) {
    this.dados = this.navParams.data.dados || {};
    this.listagemUsuario = db.collection("usuarios").valueChanges();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad DadosPetPage");
  }
}
