import { Component, OnInit, Input } from '@angular/core';
import Map from 'ol/Map';
// import Control from 'ol/control/Control';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import DragPan from 'ol/interaction/DragPan';
import { fromLonLat, toLonLat } from 'ol/proj';


//HERE service
import { HereService } from './../here.service';

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
	default = fromLonLat([77.55, 12.91]);
  // address = '50 Fairwood Drive, Rochester, NY';
  locations;
  hereCoords = "40.71,-74.01";
  @Input('address') address: string;
  lat;
  lng;
  locAddress;

  constructor(private here: HereService) { }


  ngOnInit(): void {
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
  									new DragPan()
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
    if(this.address != "") {
        this.here.getAddress(this.address).then(result => {
            this.locations = result[0];
            this.lat = this.locations.Location.DisplayPosition.Latitude;
            this.lng = this.locations.Location.DisplayPosition.Longitude;
            this.locAddress = this.locations.Location.Address;

            this.coords = fromLonLat([this.lng, this.lat]);

            this.overlay.setPosition(this.coords);
            this.view.setCenter(this.coords);

            /**
            this.map.addOverlay(new Overlay({
              position: this.coords,
              positioning: 'center-center',
              element: document.getElementById('marker'),
              stopEvent: false
            }));
            

            this.map.setView(new View({
              center: this.coords,
              zoom: 4
            }));
            */


        }, error => {
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

            console.log(this.locAddress);
            this.overlay.setPosition(this.coords);
            this.view.setCenter(this.coords);
            
        }, error => {
            console.error(error);
        });
    }
  }


}
