import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EscolhaPage } from './escolha';

@NgModule({
  declarations: [
    EscolhaPage,
  ],
  imports: [
    IonicPageModule.forChild(EscolhaPage),
  ],
// foi adicionado a parte de exports para fazer lazyloading
  exports: [
    EscolhaPage
  ]
})
export class EscolhaPageModule {}
