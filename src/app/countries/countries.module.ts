import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesComponent } from './countries.component';
import { ByCapitalPageComponent } from './pages/by-capital-page/by-capital-page.component';
import { ByCountryPageComponent } from './pages/by-country-page/by-country-page.component';
import { ByRegionPageComponent } from './pages/by-region-page/by-region-page.component';
import { CountryPageComponent } from './pages/country-page/country-page.component';
import { CountriesRoutingModule } from './countries-routing.module'; // Asegúrate de tener la ruta correcta aquí
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CountriesRoutingModule, //  importar CountriesRoutingModule aquí
    SharedModule,
  ],
  declarations: [
    CountriesComponent,
    ByCapitalPageComponent,
    ByCountryPageComponent,
    ByRegionPageComponent,
    CountryPageComponent,
  ],
})
export class CountriesModule { }