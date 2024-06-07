import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styleUrls: ['./country-table.component.css']
})
export class CountryTableComponent  {

  constructor() { }
 @Input() 
 public countries: Country[] = [];
 


}
