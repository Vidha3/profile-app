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

  // map
	map;
  overlay;
  view;

  // geocode
	geocode;

  // coords
  default;
	coords;
  hereCoords;
  coordsOnClick;
	
  // location based
  locations;
  lat;
  lng;

  // input user domain model
  @Input('user') user: User;

  constructor(private here: HereService) { 
    this.default = fromLonLat([0,0]);
  }

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
  		overlays: [this.overlay],
       
  		view: this.view
      
  	});
    
    this.getCoordsFromAddress(); 
  }

  strCoordinates(lat, long){
  // gives "lat,long" in string format
  return String(lat) + "," + String(long);
  }

  getAddressObj(location){
  // prepares address object for storing in user model
    return {
    "building": location.Address.HouseNumber,
    "street": location.Address.Street,
    "city": location.Address.City,
    "state": location.Address.State,
    "zipcode": location.Address.PostalCode,
    "coordinates": this.strCoordinates(location.DisplayPosition.Latitude, location.DisplayPosition.Longitude)
    }
  }

  // using HERE service for geocoding

  public getCoordsFromAddress() {

    if(this.user.getAddress() != "") {
        this.here.getAddress(this.user.getAddress()).then(result => {
            this.locations = result[0];
            this.lat = this.locations.Location.DisplayPosition.Latitude;
            this.lng = this.locations.Location.DisplayPosition.Longitude;
 
            // this.user.setAddress(this.getAddressObj(this.locations.Location));
            this.user.setAddress(this.locations.Location.Address.Label);
            this.coords = fromLonLat([this.lng, this.lat]);

            this.overlay.setPosition(this.coords);
            this.view.setCenter(this.coords);


        }, error => {
            console.error(error);
        });
    }
  }

  getCoordinates(event: any){
    // receives coordinates on double cliok
    this.coordsOnClick = toLonLat(this.map.getEventCoordinate(event));
    this.hereCoords = this.strCoordinates(this.coordsOnClick[1], this.coordsOnClick[0])
    this.getAddressFromLatLng(this.hereCoords);
  }

  public getAddressFromLatLng(latLon) {
  // reverse geocoding
    if(latLon != "") {
        this.here.getAddressFromLatLng(latLon).then(result => {
            this.locations = result[0];
            this.lat = this.locations.Location.DisplayPosition.Latitude;
            this.lng = this.locations.Location.DisplayPosition.Longitude;

            // this.user.setAddress(this.getAddressObj(this.locations.Location));
            this.user.setAddress(this.locations.Location.Address.Label);
            this.coords = fromLonLat([this.lng, this.lat]);

            this.overlay.setPosition(this.coords);
            this.view.setCenter(this.coords);
            
        }, error => {
            // console.error(error);
        });
    }
  }


}
