import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { User } from 'src/app/auth/interfaces/cliente.interface';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Database, onValue, ref, set, get, child } from '@angular/fire/database';
import { utcMilliseconds } from 'd3';
import { AuthService } from 'src/app/auth/services/auth.service';


@Component({
  selector: 'app-graficas',
  templateUrl: './graficas.component.html',
  styleUrls: ['./graficas.component.css']
})
export class GraficasComponent implements OnInit {
  /* id Cliente */
  uidCliente: string | undefined | null;
  voltsAcumuladosFoco!: number;
  voltsAcumuladosConector!: number;
  voltsAcumuladosCuartoUno!: number;
  voltsAcumuladosCuartoDos!: number;
  voltsAcumuladosCuartoCuatro!: number;

  constructor(private auth: Auth, private authService: AuthService, private database: Database) { }

  ngOnInit(): void {
    this.auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user?.uid) {
        this.uidCliente = user?.uid
        console.log(this.uidCliente);
        const starCountRef = ref(this.database, 'users/' + this.uidCliente);
        onValue(starCountRef, (snapshot) => {
          const data = snapshot.val();
          this.voltsAcumuladosFoco = data.focos[0].voltsAcumulados
          this.voltsAcumuladosConector = data.conectores[0].voltsAcumulados
          this.voltsAcumuladosCuartoUno = data.focoConector[0].voltsAcumulados
          this.voltsAcumuladosCuartoDos = data.focoConector[1].voltsAcumulados
          this.voltsAcumuladosCuartoCuatro = data.focoConector[2].voltsAcumulados
          this.randomize();
        })
      }
    })
  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [ 'Consumo de energía'],
    datasets: [
      { data: [0], label: 'Cuarto Uno' },
      { data: [0], label: 'Caurto Dos' },
      { data: [0], label: 'Caurto Tres' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  randomize(): void {
    // Only Change 3 values

    var cuartoUno = this.voltsAcumuladosConector + this.voltsAcumuladosFoco;
    
    this.barChartData.datasets[0].data[0] = this.voltsAcumuladosCuartoUno
    this.barChartData.datasets[1].data[0] = this.voltsAcumuladosCuartoDos;
    this.barChartData.datasets[2].data[0] = this.voltsAcumuladosCuartoCuatro;
   

    this.chart?.update();
  }

}
