import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { Acessorio } from '../../modelos/acessorio';
import { CadastroPage } from '../cadastro/cadastro';

/**
 * Generated class for the EscolhaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

  public carro: Carro;
  public acessorios: Acessorio[];
  private valor_total: number;

  constructor(

    public navCtrl: NavController,
    public navParams: NavParams
  ){
      
      //pegando o parâmetro que contém o carro da página Home
      this.carro = this.navParams.get('carroSelecionado');

      this.valor_total = this.carro.preco;

      this.acessorios = [
        {nome: 'Freio ABS', preco: 750},
        {nome: 'Media NAV', preco: 1550},
        {nome: 'Câmera de Ré', preco: 525},
        {nome: 'Retrovisor Elétrico', preco: 750},
        {nome: 'Sensor Colisão', preco: 450},
      ]
    }

    get valorTotal() {
      return this.valor_total
    }

    atualizaValorTotal(toggleChecked: boolean, acessorio: Acessorio) {

      /*if(toggleChecked) {
        this.valor_total += preco;
      } else {
        this.valor_total -= preco;
      }*/

      // reescrevendo o teste condicional acima:
      toggleChecked ?
        this.valor_total += acessorio.preco :
        this.valor_total -= acessorio.preco;

    }

    avancarCadastro() {
      this.navCtrl.push(CadastroPage.name, {
        carroSelecionado: this.carro,
        valorTotal: this.valor_total
      });
    }

  /*
  ionViewDidLoad() {
    console.log('ionViewDidLoad EscolhaPage');
  }*/

}
