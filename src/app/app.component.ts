import { Component, ViewChild } from "@angular/core";
import { Platform, Nav } from "ionic-angular";

import { InicialPage } from "../pages/inicial/inicial";
import { LoginPage } from "../pages/login/login";
import { PerfilPage } from "../pages/perfil/perfil";
import { CadastroPetPage } from "../pages/cadastro-pet/cadastro-pet";
import { MeusPetsPage } from "../pages/meus-pets/meus-pets";
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";

@Component({
  templateUrl: "app.html"
})
export class MyApp {
  public lista: Observable<any[]>;
  public uiduser: string;
  public dados: any;

  rootPage: any = null;

  @ViewChild(Nav) private nav: Nav;

  constructor(
    platform: Platform,
    public afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) {
    this.lista = db.collection("/usuarios/").valueChanges();

    platform.ready().then(() => {
      afAuth.auth.onAuthStateChanged(user => {
        if (user != null) {
          // está logado:
          this.rootPage = InicialPage;
          this.uiduser = this.afAuth.auth.currentUser.uid;
        } else {
          // não está logado:
          this.rootPage = LoginPage;
        }
      });
    });
  }

  public inicial(): void {
    this.nav.push(InicialPage);
  }

  public pets(): void {
    this.nav.push(MeusPetsPage);
  }

  public cadastrarPets(): void {
    this.nav.push(CadastroPetPage);
  }

  public logout(): void {
    this.afAuth.auth.signOut();
  }

  public editar(): void {
    this.nav.push(PerfilPage);
  }

}
