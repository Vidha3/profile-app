import { Component, OnInit, Input } from '@angular/core';

import { User } from './../models/user';

import Map from 'ol/Map';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import DragPan from 'ol/interaction/DragPan';
import PinchZoom from 'ol/interaction/PinchZoom';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import { fromLonLat, toLonLat } from 'ol/proj';

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
	map: Map;
  overlay: Overlay;
  view: View;

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
  	this.initializeMap();
    this.getCoordsFromAddress(); 
  }

  initializeMap(){
  // initialize map object

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
  }

  strCoordinates(lat, long){
  // returns "lat,long" in string format
  return String(lat) + "," + String(long);
  }

  // using HERE service for geocoding; gets latitude, longitude etc from address

  public getCoordsFromAddress() {

    if(this.user.getAddress() != "") {
        this.here.getAddress(this.user.getAddress()).then(result => {
            this.locations = result[0];
            this.lat = this.locations.Location.DisplayPosition.Latitude;
            this.lng = this.locations.Location.DisplayPosition.Longitude;
            
            // update address field in user model
            this.user.setAddress(this.locations.Location.Address.Label);
            
            // adjust view and map marker position as per address
            this.coords = fromLonLat([this.lng, this.lat]);
            this.overlay.setPosition(this.coords);
            this.view.setCenter(this.coords);


        }, error => {
            console.error(error);
        });
    }
  }

  getCoordinates(event: any){
    // receives coordinates on double click on the map, calls reverse geocoding

    this.coordsOnClick = toLonLat(this.map.getEventCoordinate(event));
    this.hereCoords = this.strCoordinates(this.coordsOnClick[1], this.coordsOnClick[0])
    this.getAddressFromLatLng(this.hereCoords);
  }

  public getAddressFromLatLng(latLon) {
  // reverse geocoding; uses latitude,longitude to get address

    if(latLon != "") {
        this.here.getAddressFromLatLng(latLon).then(result => {
            this.locations = result[0];
            this.lat = this.locations.Location.DisplayPosition.Latitude;
            this.lng = this.locations.Location.DisplayPosition.Longitude;

            // update address field in user model
            this.user.setAddress(this.locations.Location.Address.Label);

            // adjust view and map marker position as per new address
            this.coords = fromLonLat([this.lng, this.lat]);
            this.overlay.setPosition(this.coords);
            this.view.setCenter(this.coords);
            
        }, error => {
            // console.error(error);
            // do nothing
        });
    }
  }


}
