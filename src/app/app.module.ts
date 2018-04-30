import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { CarrosServiceProvider } from '../providers/carros-service/carros-service';
import { AgendamentoServiceProvider } from '../providers/agendamento-service/agendamento-service';
//import { EscolhaPage } from '../pages/escolha/escolha';

// adicionando o módulo finally do rxjs:
import 'rxjs/add/operator/finally';

@NgModule({
  // todas as páginas:
  declarations: [
    MyApp,
    HomePage,
    //EscolhaPage
  ],

  // todos os módulos necessário à apicação
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],

  bootstrap: [IonicApp],

  // todas as páginas navegáveis  
  entryComponents: [
    MyApp,
    HomePage,
    //EscolhaPage
  ],

  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarrosServiceProvider,
    AgendamentoServiceProvider
  ]
})
export class AppModule {}
