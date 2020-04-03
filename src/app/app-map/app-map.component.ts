import { Component, OnInit, Input } from '@angular/core';
import Map from 'ol/Map';
// import Control from 'ol/control/Control';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import DragPan from 'ol/interaction/DragPan';
import PinchZoom from 'ol/interaction/PinchZoom';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import { fromLonLat, toLonLat } from 'ol/proj';
import { User } from './../models/user';

//HERE service
import { HereService } from './../services/here.service';

// Because we’re working with TypeScript and the HERE API is JavaScript,
// we need to tell the TypeScript compiler to ignore 
// the fact that our library doesn’t have the appropriate type 
// definitions. This is done through the following line:

declare var H: any;

@Component({
  selector: 'app-map',
  templateUrl: './app-map.component.html',
  styleUrls: ['./app-map.component.css']
})
export class MapComponent implements OnInit {


	map;
  overlay;
  view;
	geocode;
	coords;
  coordsOnClick;
	default = fromLonLat([0,0]);
  // address = '50 Fairwood Drive, Rochester, NY';
  locations;
  hereCoords = "40.71,-74.01";
  @Input('user') user: User;
  // address = this.user.getAddress();
  lat;
  lng;
  locAddress;

  constructor(private here: HereService) { }


  ngOnInit(): void {
    // console.log("test " + this.user.getAddress());
  	this.initializeMap();
  }

  initializeMap(){

    this.overlay = new Overlay({
          position: this.default,
          positioning: 'center-center',
          element: document.getElementById('marker'),
          stopEvent: false
        });
    this.view = new View({
        center: this.default,
        zoom: 4
      });
  	this.map = new Map({
  		target: 'map',
  		interactions: [
  									new DragPan(),
                    new PinchZoom(),
                    new MouseWheelZoom
  									],
  		layers: [
  						new Tile({
					      source: new OSM()
					    })
  						],
  		overlays: [
  			this.overlay
  		 ],
       
  		view: this.view
      
  	});
    this.getAddress();
    
  }

  //using HERE service

  public getAddress() {

    if(this.user.getAddress() != "") {
        this.here.getAddress(this.user.getAddress()).then(result => {
            this.locations = result[0];
            this.lat = this.locations.Location.DisplayPosition.Latitude;
            this.lng = this.locations.Location.DisplayPosition.Longitude;
            this.locAddress = this.locations.Location.Address;
            // console.log(this.locAddress);
            this.user.setAddress(this.locAddress.Label);
            this.coords = fromLonLat([this.lng, this.lat]);

            this.overlay.setPosition(this.coords);
            this.view.setCenter(this.coords);


        }, error => {
            this.user.setAddress("(address entered was invalid, please reenter and submit)");

            console.error(error);
        });
    }
  }

  getCoordinates(event: any){
    this.coordsOnClick = toLonLat(this.map.getEventCoordinate(event));
    this.hereCoords = String(this.coordsOnClick[1]) + "," + String(this.coordsOnClick[0]);
    this.getAddressFromLatLng(this.hereCoords);
  }

  public getAddressFromLatLng(latLon) {
    if(latLon != "") {
        this.here.getAddressFromLatLng(latLon).then(result => {
            this.locations = result[0];
            this.lat = this.locations.Location.DisplayPosition.Latitude;
            this.lng = this.locations.Location.DisplayPosition.Longitude;
            this.locAddress = this.locations.Location.Address;
            
            this.coords = fromLonLat([this.lng, this.lat]);
            this.user.setAddress(this.locAddress.Label);

            // console.log(this.locAddress);
            this.overlay.setPosition(this.coords);
            this.view.setCenter(this.coords);
            
        }, error => {
            // console.error(error);
        });
    }
  }


}
