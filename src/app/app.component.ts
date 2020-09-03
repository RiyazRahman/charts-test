import { Component, ViewChild, ElementRef } from '@angular/core';
import * as FusionCharts from 'fusioncharts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('item') item: ElementRef;
  gestureTypeForSwipe = '';
  gestureTypeForRefresh = '';
  inputVal = [];
  refreshVal = ['Test1', 'Test2', 'Test3' ];
  dataSource: any;
  type: string;
  width: string;
  height: string;

  constructor() {
    this.type = 'timeseries';
    this.width = '100%';
    this.height = '400';
    // This is the dataSource of the chart
    this.dataSource = {
      // Initially data is set as null
      data: null,
      styledefinition: {
        areaplot: {
          'stroke-opacti7': 0.05,
          'fill-opactiy': 0.05,
          fill: '#2b55d9',
        }
      },
      chart: {
        numDivLines: 0,
        showLegend: 0,
        palettecolors: '#2b55d9',
        plottooltext: `<div id='frame'><div id='main-title'><div id='value-title'></div></div></div>`,
      },
      caption: {
        text: 'Daily Visitors Count of a Website'
      },
      yAxis: [
        {
          plot: {
            value: 'Daily Visitors',
            type: 'area'
          },
          title: 'Daily Visitors (in thousand)'
        }
      ],
      navigator: {
        enabled: 0
      }
    };
    this.fetchData();
  }

  fetchData(): void {
    const jsonify = res => res.json();
    const dataFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/area-chart-with-time-axis-data.json'
    ).then(jsonify);
    const schemaFetch = fetch(
      'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/area-chart-with-time-axis-schema.json'
    ).then(jsonify);

    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      // First we are creating a DataStore
      const fusionDataStore = new FusionCharts.DataStore();
      // After that we are creating a DataTable by passing our data and schema as arguments
      const fusionTable = fusionDataStore.createDataTable(data, schema);
      // Afet that we simply mutated our timeseries datasource by attaching the above
      // DataTable into its data property.
      this.dataSource.data = fusionTable;
    });
  }


  onSwipeLeft(evt): void {
    console.log(evt);
    this.gestureTypeForSwipe += `${evt.type} <br/>`;
  }
  onSwipeRight(evt): void {
    console.log(evt);
    this.gestureTypeForSwipe += `${evt.type} <br/>`;
  }

  onSwipeDown(evt): void {
    console.log(evt);
    this.gestureTypeForRefresh += `${evt.type} <br/>`;
    this.refreshVal = [...this.inputVal, ...this.refreshVal];
    this.inputVal = [];
  }

  addItem(value): void {
    if (value) {
    this.inputVal.push(value);
    this.item.nativeElement.value = '';
    // console.log(this.inputVal);
    }
  }
}
