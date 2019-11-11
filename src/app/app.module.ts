import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LogonComponent } from './logon/logon.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatSelectModule,
  MatSidenavModule
} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ProfileComponent } from './profile/profile.component';
import { RoutingModule } from './routing/routing.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material';
import { MatCardModule } from '@angular/material/';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import { QuatesComponent } from './quates/quates.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FusionChartsModule } from 'angular-fusioncharts';

// Load FusionCharts
import * as FusionCharts from 'fusioncharts';
// Load Charts module
import * as Charts from 'fusioncharts/fusioncharts.charts';
// Load themes
import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

import * as TimeSeries from 'fusioncharts/fusioncharts.timeseries';
import {AuthHttpInterceptor} from './service/auth-http-interceptor.service';


// Add dependencies to FusionChartsModule
FusionChartsModule.fcRoot(
  FusionCharts,
  Charts,
  FusionTheme,
  TimeSeries
);


@NgModule({
  declarations: [
    AppComponent,
    LogonComponent,
    ProfileComponent,
    QuatesComponent,
    ProfileDetailsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatMenuModule,
    MatSidenavModule,
    RoutingModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatGridListModule,
    MatToolbarModule,
    HttpClientModule,
    MatAutocompleteModule,
    FusionChartsModule,
    MatFormFieldModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi : true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
