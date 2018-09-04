import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormGroup, FormControl} from '@angular/forms';
import {Observable, of} from  'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {WeatherService} from '../services/weather.service';

@Component({
  selector: 'app-my-weathermap-app',
  templateUrl: './my-weathermap-app.component.html',
  styleUrls: ['./my-weathermap-app.component.css']
})
export class MyWeathermapAppComponent implements OnInit {

  private result = {};

  searchForm = new FormGroup(
      {
        cityname: new FormControl(''),
      }
  );
  constructor(private weatherSvc: WeatherService) { }

  ngOnInit() {
    const cityField = this.searchForm.get('cityname');
    console.log(cityField);
    let debounce = cityField.valueChanges.pipe (
      debounceTime(1000),
      distinctUntilChanged()
    );
    debounce.subscribe(changes => {
      console.log(">>>@@@>>",changes);
      this.weatherSvc.getWeather(changes)
      .subscribe((data:any)=>{
        console.log("data>>>", data);
        this.result = data.main;
      })
  });
  }
}
