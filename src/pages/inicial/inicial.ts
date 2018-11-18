import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from "rxjs";

import { DadosPetPage } from "../dados-pet/dados-pet";

@Component({
  selector: "page-inicial",
  templateUrl: "inicial.html"
})
export class InicialPage {
  public listagem: Observable<any[]>;

  constructor(private navCtrl: NavController, private db: AngularFirestore) {
    this.listagem = db.collection("pets").valueChanges();
  }

  public detalhes(p: any): void {
    this.navCtrl.push(DadosPetPage, { dados: p });
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad InicialPage");
  }
}
