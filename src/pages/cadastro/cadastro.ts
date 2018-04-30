import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { AgendamentoServiceProvider } from '../../providers/agendamento-service/agendamento-service';
import { HomePage } from '../home/home';
import { Agendamento } from '../../modelos/agendamento';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  public preco: number;

  public name: String = '';
  public endereco: String = '';
  public email: String = '';
  public data: String = new Date().toISOString();

  private alert: Alert;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private _agendamentosService: AgendamentoServiceProvider,
    private _alertCtrl: AlertController
  ){

    this.carro = this.navParams.get('carroSelecionado');
    this.preco = this.navParams.get('valorTotal');

  }

  agenda(){

    /*console.log(this.name);
    console.log(this.endereco);
    console.log(this.email);
    console.log(this.data);*/

    // testando se os campos estão vazios
    if(!this.name || !this.endereco || !this.email){

      this._alertCtrl.create({
        title: 'Preenchimento incompleto',
        subTitle: 'Está faltando algo... Por favor preencha todos os campos para realizar o agendamento.',
        buttons: [
          {text: 'Ok'}
        ]
      }).present();
        
      return;
    }

    let agendamento: Agendamento = {
      nomeCliente: this.name,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.preco
    }

    // criando um alerta:
      //o alerta foi declarado nesse ponto pois pode ser necessário reeconstruir esse alerta
    this.alert = this._alertCtrl.create({
      title: 'Aviso',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.setRoot(HomePage);
          }
        }
      ]
    });

    let mensagem = '';

    this._agendamentosService.agenda(agendamento)
    .finally(
      () => {
        this.alert.setSubTitle(mensagem);
        this.alert.present(); //depois que é apresentado, o objeto alerta é destruído
      }
    ).subscribe(

      //callback sucesso
      () => {
        mensagem='Agendamento completo!';
      },
      
      //callback erro
      () => {
        mensagem = 'Não foi possível realizar o agendamento.';
      }

    );
  }

  /*
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }*/
}
