import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { MyApp } from "./app.component";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";

import { Camera } from "@ionic-native/camera";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';

import { CadastroPetPage } from "../pages/cadastro-pet/cadastro-pet";
import { CadastroUsuarioPage } from "../pages/cadastro-usuario/cadastro-usuario";
import { RecuperaSenhaPage } from "../pages/recupera-senha/recupera-senha";
import { DadosPetPage } from "../pages/dados-pet/dados-pet";
import { InicialPage } from "../pages/inicial/inicial";
import { LoginPage } from "../pages/login/login";
import { MeusPetsPage } from "../pages/meus-pets/meus-pets";
import { PerfilPage } from "../pages/perfil/perfil";

const config = {
  apiKey: "AIzaSyBQXM7Z7ylCvN6SOTkJLQVGqmztLC_MQpQ",
  authDomain: "tindogcat-e7945.firebaseapp.com",
  databaseURL: "https://tindogcat-e7945.firebaseio.com",
  projectId: "tindogcat-e7945",
  storageBucket: "tindogcat-e7945.appspot.com",
  messagingSenderId: "73314532133"
};

@NgModule({
  declarations: [
    MyApp,
    CadastroPetPage,
    CadastroUsuarioPage,
    DadosPetPage,
    InicialPage,
    LoginPage,
    MeusPetsPage,
    PerfilPage,
    RecuperaSenhaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    FormsModule,
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CadastroPetPage,
    CadastroUsuarioPage,
    DadosPetPage,
    InicialPage,
    LoginPage,
    MeusPetsPage,
    PerfilPage,
    RecuperaSenhaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },

    Camera
  ]
})
export class AppModule { }
