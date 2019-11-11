import {Component, OnInit, NgZone} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import * as FusionCharts from 'fusioncharts';
import {Subscription, timer, pipe} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
// import {RSocketClient, JsonSerializer, IdentitySerializer} from 'rsocket-core';
// import RSocketWebSocketClient from 'rsocket-websocket-client';
// tslint:disable-next-line:import-blacklist


@Component({
  selector: 'app-quates',
  templateUrl: './quates.component.html',
  styleUrls: ['./quates.component.css']
})
export class QuatesComponent implements OnInit {
  restApi = 'http://localhost:8080/stock';
  symbols = [{symbol: 'AAA'}, {symbol: 'BBB'}];
  myControl = new FormControl();
  dataArray = [];
  type: string;
  width: string;
  height: string;
  username;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
    this.type = 'column2d';
    this.width = '25%';
    this.height = '400';
  }

  filteredOption = this.myControl.valueChanges
    .pipe(startWith(),
      map(value => this._filter(value)));


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.symbols.map(sym => sym.symbol).filter(option => option.toLowerCase().includes(filterValue));
  }

  updateChart(dataSource) {
    const source = new EventSource('http://localhost:8080/stock/'+this.myControl.value);
    source.addEventListener('message', (aString) => {
      dataSource.data.push({value: aString['data']});
    });
  }

  ok() {
    const dataSource = {
      data: [],
      caption: {
        text: this.myControl.value
      },
      yAxis: {
        plot: {
          value: 'Open',
          type: 'candlestick'
        },
        title: 'Value'
      }
    };
    this.dataArray.push(dataSource);
    this.fetchData(dataSource);
    this.updateChart(dataSource);
  }

  fetchData(dataSource) {
    const jsonify = res => res.json();
    const dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/candlestick-chart-data.json'
    ).then(jsonify);
    const schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/candlestick-chart-schema.json'
    ).then(jsonify);



    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creatin`g a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      // dataSource.data = fusionTable;
    });
  }

  ngOnInit() {
    this.httpClient.get(this.restApi)
      .subscribe((data : any[]) => {
        this.symbols = data;
      });
  }
}
