import { Injectable } from '@angular/core';
import { PlaceLocation } from './logic/PlaceLocation';
import { Coffee } from './logic/Coffee';
import { Http } from "@angular/http";

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  public endpoint = "http://localhost:3000";



  get(coffeeId:string, callback){
    this.http.get(`${this.endpoint}/coffees/${coffeeId}`)
    .subscribe(response => {
       callback(response.json());
    });
  } 





 //This method was formerly written to give static data 
 getList(callback){
//   const list =[
//     new Coffee("Coke","BiggerBoy", new PlaceLocation("18 mabo street surulere","lagos")),
//     new Coffee("CokeZero","solo", new PlaceLocation("Zone2 liverpool estate","lagos"))
//   ]
//   callback(list);
this.http.get(`${this.endpoint}/coffees`)
.subscribe(response=>{
  console.log(response.json());
  callback(response.json() );
});

}
save(coffee,callback){
  if (coffee._id) {
    this.http.put(`${this.endpoint}/coffees/${coffee._id}`,coffee)
    .subscribe(response => {
      callback(true);
    });
    
  }else{
    this.http.post(`${this.endpoint}/coffees`,coffee)
    .subscribe(response => {
      callback(true);
    });
  }
  
}
}
