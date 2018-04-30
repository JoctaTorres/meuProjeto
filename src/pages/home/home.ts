import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { HttpErrorResponse } from '@angular/common/http';
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';
import { NavLifeCycles } from '../../utils/ionic/nav/nav-lifecycles';
import { EscolhaPage } from '../escolha/escolha';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements NavLifeCycles {

  public carros: Carro[];

  constructor(

    public navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController,
    private _carrosService: CarrosServiceProvider
  ) { /**/ }


  /* A nevagação da aplicação tem algumas fase (ciclos):
    ionViewDidLoad() é a fase que é executada quando o carregamento dessa página é completada
  */

  ionViewDidLoad() {

    //cria a mensagem de carregamento:
    let loading = this._loadingCtrl.create(
      {
        content: 'Carregando carros...'
      }
    );

    // inicia a apresentação a mensagem de loading até receber totalmente os dados da api
    loading.present();

    // cria a mensagem de alerta, mas não a apresenta:
    let alert = this._alertCtrl.create({
        title: 'Falha na conexão',
        subTitle: 'Não foi possível carregar a lista de carros, tente novamente mais tarde',
        buttons: [
          {
            text: 'Ok'
          }
        ]
    });


    // foi criado uma classe carros-service que é um provider para conectar à API node
    // o método  lista() de this._carrosService realiza uma requisição à rota da API pelo HttpClient.get<Carro[]>  que retorna um Observable para o tipo <Carro[]>
    this._carrosService.lista().subscribe(
      
        // recebendo carros do tipo <Carro[]> da API
        (carros) => {
            this.carros = carros;

            // a partir desse ponto os dados da API já foram recebidos com sucesso
            //sendo assim, podemos retirar o loading
            loading.dismiss();
        },

        // caso haja um erro de resposta da API
        (err: HttpErrorResponse) => {

            console.log(err);

            //houve erro da API, então podemos retirar o loading:
            loading.dismiss();

            // mostrando um mensgem de alerta
            alert.present();
        }
    ); //fim do método subscribe
  } //fim do ionViewDidLoad

  selecionaCarro(carro: Carro){
    console.log(carro);

    //mudando (empilhando/pushing) a tela Escolha e passando o carro com parâmetro
    // a tela de escolha é carregada por lazyLoading
    this.navCtrl.push(EscolhaPage.name, { carroSelecionado: carro});
  }
  

}
