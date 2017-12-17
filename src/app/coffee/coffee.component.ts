import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute,Router } from "@angular/router";
import { Coffee } from '../logic/Coffee';
import { GeolocationService } from "../geolocation.service";
import { TastingRating } from '../logic/TastingRating';
import { DataService } from "../data.service";


@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.css'],
  encapsulation: ViewEncapsulation.None
})

// Inside the class i will write all my methods and functions

export class CoffeeComponent implements OnInit {

 coffee : Coffee;
 tastingEnabled : boolean = false;
 types = ["Espresso", "Ristretto","Americano","Cappuccino" ];

  constructor(private route: ActivatedRoute, private geolocation: GeolocationService, private router: Router, private data: DataService) { }
   routingSubscription: any;

tastingRatingChanged(checked: boolean){
  if(checked){
    this.coffee.tastingRating = new TastingRating();
  }else{
    this.coffee.tastingRating=null;
  }
}
save(){
this.data.save(this.coffee, result =>{
  if (result) {
    this.router.navigate(["/"]);
  }
});
}
cancel(){// we use this router service to tackle our navigation problem after injecting the router seervice
  this.router.navigate(["/"])
}
// this code is reponsible for the populating of the form fields with former data
  ngOnInit() {
    this.coffee = new Coffee( )
    this.routingSubscription = 
    this.route.params.subscribe(params =>{
      console.log(params["id"]);
    if (params["id"]) {
      this.data.get(params["id"],response => {// this code gets the coffee object and populates it in the fields
        this.coffee = response;
        // for tasting rating
        if (this.coffee.tastingRating) {
          this.tastingEnabled = true;
        }
      }); 
    }


    });
    this.geolocation.requestLocation(location =>{
      if(location){
        this.coffee.location.latitude= location.latitude;
        this.coffee.location.longitude= location.longitude;
      }
    });
  }

  ngOnDestroy(){
    this.routingSubscription.unsubscribe();
  }


}
