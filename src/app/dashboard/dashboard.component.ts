import { Component, OnInit } from '@angular/core';

import { DadosService } from './dados.service';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private dados: any;
  
  constructor(private dadosService: DadosService) { }

  ngOnInit() {
    this.dadosService.obterDados().subscribe(
      dados => {
        this.dados = dados;
        this.init();
      });
  }

  /**
   * Inicializa a API de gráficos com delay de 1 segundo,
   * o que permite a integração da API com o Angular
   *
   * @return void
   */
  init(): void {
    if (typeof(google) !== 'undefined') {
      google.charts.load('current', {'packages':['corechart']});
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficos());
      }, 1000);
    }
  }

  /**
   * Método chamado assim que a API de gráficos é inicializada
   * Responsável por chamar os métodos geradores dos gráficos
   *
   * @return void
   */
  exibirGraficos(): void {
    this.exibirPieChart();
    this.exibir3dPieChart();
    this.exibirDonutChart();
    this.exibirBarChart();
    this.exibirLineChart();
    this.exibirColumnChart();
  }

  /**
   * Exibe o gráfico de Pie Chart
   *
   * @return void
   */
  exibirPieChart(): void {
    const EL = document.getElementById('pie_chart');
    const CHART = new google.visualization.PieChart(EL);

    CHART.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * Exibe o gráfico Pie Chart em 3D
   *
   * @return void
   */
  exibir3dPieChart(): void {
    const EL = document.getElementById('3d_pie_chart');
    const CHART = new google.visualization.PieChart(EL);
    const OPCOES = this.obterOpcoes();

    OPCOES['is3D'] = true;
    CHART.draw(this.obterDataTable(), OPCOES);
  }

  /**
   * Exibe o gráfico Donut Chart
   *
   * @return void
   */
  exibirDonutChart(): void {
    const EL = document.getElementById('donut_chart');
    const CHART = new google.visualization.PieChart(EL);
    const OPCOES = this.obterOpcoes();

    OPCOES['pieHole'] = 0.4;
    CHART.draw(this.obterDataTable(), OPCOES);
  }

  /**
   * Evibe o gráfico de Bar Chart
   *
   * @return void
   */
  exibirBarChart(): void {
    const EL = document.getElementById('bar_chart');
    const CHART = new google.visualization.BarChart(EL);

    CHART.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * Exibe o gráfico de Line Chart
   *
   * @return void
   */
  exibirLineChart(): void {
    const EL = document.getElementById('line_chart');
    const CHART = new google.visualization.LineChart(EL);

    CHART.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * Exibe o gráfico de Column Chart
   *
   * @return void
   */
  exibirColumnChart(): void {
    const EL = document.getElementById('column_chart');
    const CHART = new google.visualization.ColumnChart(EL);

    CHART.draw(this.obterDataTable(), this.obterOpcoes());
  }

  /**
   * Cria e retorna o objeto DataTable da API de gráficos,
   * responsável por definir os dados do gráfico
   *
   * @return any 
   */
  obterDataTable(): any {
    const DATA = new google.visualization.DataTable();

    DATA.addColumn('string', 'Mês');
    DATA.addColumn('number', 'Quantidade');
    DATA.addRows(this.dados);

    return DATA;
  }

  /**
   * Retorna as opções do gráfico, que incluem o título
   * e tamanho do gráfico
   *
   * @return any
   */
  obterOpcoes(): any {
    return {
      title: 'Quantidade de cadastros primeiro semestre',
      width: 400,
      height: 300
    };
  }

}
