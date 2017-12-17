import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { Coffee } from '../logic/Coffee';
import { Router } from "@angular/router";
import { GeolocationService } from '../geolocation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListComponent implements OnInit {


  list = [Coffee]
  constructor(private data: DataService,private router: Router,private geolocation: GeolocationService) { }

  getDetails(coffee:Coffee){
      this.router.navigate(["/coffee", coffee._id])
  }

// since this is a typescript file i need to write out the service
  getMap(coffee: Coffee){
     //gets the coffee from the service
    const mapURL = this.geolocation.getMapLink(coffee.location);
    location.href = mapURL;


  }

share(coffee: Coffee){
 const shareText = `I had this coffee at ${coffee.place} and for me its a ${coffee.rating} star coffee `;

// first confirm if your browser has the given button
if ('share' in navigator) {
  //this is a promise that will be suscribed to
  navigator["share"]({//  we can also use (navigator as any).share({})
title: coffee.name,
text : shareText ,
url: window.location.href
  }).then( () => console.log("shared")).catch( ()=>console.log("eror sharing") );
}else{
  const shareURL = `whatsapp://send?text=${encodeURIComponent(shareText)}`;
  location.href = shareURL;
}
   



}




  ngOnInit() {
    this.data.getList(list=>{
      this.list =list;
    })
  }

}
