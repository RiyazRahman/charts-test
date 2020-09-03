import { BrowserModule, HammerModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as Hammer from 'hammerjs';
import { AppComponent } from './app.component';
import { FusionChartsModule } from 'angular-fusioncharts';
// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load themes
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries';


export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: { direction: Hammer.DIRECTION_ALL },
  } as any;
}

FusionChartsModule.fcRoot(
  FusionCharts,
  Charts,
  FusionTheme,
  TimeSeries
);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HammerModule,
    FusionChartsModule
  ],
  providers: [
    {provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
