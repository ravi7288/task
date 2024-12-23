import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { LoaderService } from '../services/loader.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule,NgFor,HttpClientModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
  providers: [ HttpService, LoaderService,]
})
export class WeatherComponent {

  title = 'weatherApp';
  weatherData:any=[];
  city:any;
  loading:boolean=false;
  datanot:boolean = false
  constructor(private httpService:HttpService,loader:LoaderService){}

  onCityEnter(){
    this.getLonLat(this.city);
    this.weatherData = [];

  }

  getLonLat(city:string){
    this.loading=true;
    console.log(city)
if(city !== undefined){
  this.httpService.getLonLat(city).subscribe({
    next:(response:any)=>{
      this.loading=false;
      console.log(response)
      this.getWeather(response[0].lat,response[0].lon)
    }
});
} else {
  alert("Enter your city Name");
  this.loading=false;
}


}


getWeather(lat:any,lon:any){
  this.httpService.getWeather(lat,lon).subscribe({
    next:(response:any)=>{
      for(let i in response.list){
        let onlyDate:any=response.list[i].dt_txt.split(' ')[0];
        let onlyTime:any=response.list[i].dt_txt.split(' ')[1];
        if(onlyTime=="00:00:00"){
          let splitDate:any=onlyDate.split('-')
          let data:any={
            
            date:splitDate[2]+"-"+splitDate[1]+"-"+splitDate[0],
            temp:response.list[i].main.temp,
            humidity:response.list[i].main.humidity,
            pressure:response.list[i].main.pressure,
            temp_max:response.list[i].main.temp_max,
            temp_min:response.list[i].main.temp_min

          }
          this.weatherData.push(data)
        }

      }

    }
});
}

}
