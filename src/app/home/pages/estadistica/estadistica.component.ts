import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { User } from 'src/app/auth/interfaces/cliente.interface';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Database, onValue, ref, set, get, child } from '@angular/fire/database';
import { utcMilliseconds } from 'd3';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  /*variables*/
  /* fecha */
  dateTime: any;
  /* id Cliente */
  uidCliente: string | undefined | null;
  /* datos cliente */
  datosCliente: User = {
    nombre: "",
    apellidos: "",
    direccion: "",
    telefono: "",
    email: "",
    password: "",
    focos: [
      {
        id: 0,
        switch: false,
        nombreCuarto: "",
        volts: 0,
        voltsAcumulados: 0
      }
    ],
    conectores: [
      {
        id: 0,
        switch: false,
        nombreCuarto: "",
        volts: 0,
        voltsAcumulados: 0
      }
    ],
    focoConector: [
      {
        id: 0,
        switch: false,
        nombreCuarto: "",
        volts: 0,
        voltsAcumulados: 0
      },
      {
        id: 0,
        switch: false,
        nombreCuarto: "",
        volts: 0,
        voltsAcumulados: 0
      }
    ]
  }
  voltsAcumuladosFoco!: number;
  voltsAcumuladosConector!: number;
  voltsAcumuladosCuartoDos!: number;
  voltsAcumuladosCuartoTres!: number;
  constructor(private auth: Auth, private authService: AuthService, private database: Database) {

  }

  ngOnInit(): any {
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
          this.voltsAcumuladosCuartoDos = data.focoConector[0].voltsAcumulados
          this.voltsAcumuladosCuartoTres = data.focoConector[1].voltsAcumulados
          this.randomize();

          /* var valor1B: number = data.focoConector[0].voltsAcumulados 
          var valor1C: number = 
          var valor1D: number = 
          var valor1E: number = 
         var valor1F: number =  */
        })
      }
    })

  }
/* primera grafica */
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
      },

    }
  };

  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
  ];


  public barChartData: ChartData<'bar'> = {
    labels: ['Consumo'],
    datasets: [
      {
        data: [0],
        label: 'Foco'
      },
      {
        data: [0],
        label: 'Conector'
      },
    ],
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
  
  
  // events
  public chartClicked2({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered2({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }
  



  randomize(): void {

    /* let hours = new Date().getHours();
    let min = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let day= new Date().getDay();
    let month = new Date().getMonth();
    let year= new Date().getFullYear();

    console.log(hours);
    console.log(min);
    console.log(seconds);
    console.log(day);
    console.log(month);
    console.log(year); */
    
    /* this.barChartData2.datasets[0].data[0] = this.voltsAcumuladosFoco;
    this.barChartData2.datasets[1].data[0] = this.voltsAcumuladosFoco;
    this.barChartData2.datasets[2].data[0] = this.voltsAcumuladosFoco; */
    console.log(this.voltsAcumuladosCuartoDos);
    console.log(this.voltsAcumuladosCuartoTres);
    console.log(this.voltsAcumuladosFoco);
    console.log(this.voltsAcumuladosConector);

    /* grafica de cuarto uno */
    this.barChartData.datasets[0].data[0] = this.voltsAcumuladosFoco;
    this.barChartData.datasets[1].data[0] = this.voltsAcumuladosConector;
    this.chart?.update();
    
  }
}
