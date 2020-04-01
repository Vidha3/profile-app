import { Component, OnInit, Input } from '@angular/core';
import Map from 'ol/Map';
// import Control from 'ol/control/Control';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import DragPan from 'ol/interaction/DragPan';
import { fromLonLat } from 'ol/proj';

// bunch of npm libraries that didn't work
// import Geocoder from 'ol-geocoder';
// import LocationIq from 'locationiq';
// import { geocode, reverseGeocode } from 'geocoder';

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
	geocode;
	coords;
  coords2 = fromLonLat([-74.01, 40.71]);
	pnagar = fromLonLat([77.55, 12.91]);

  // address = '50 Fairwood Drive, Rochester, NY';
  locations;
  hereCoords = "40.71,-74.01";
  @Input('address') address: string;
  lat;
  lng;
  locAddress;

  // constructor(private geocoder: geocodeService) { }
  constructor(private here: HereService) { }


  ngOnInit(): void {
  	this.initializeMap();
  	// console.log(locationiq.search('50 Fairwood Drive, Rochester, NY, USA'))
  }

  initializeMap(){
    

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
      /**
  		overlays: [
  			new Overlay({
  				position: this.coords,
  				positioning: 'center-center',
  				element: document.getElementById('marker'),
  				stopEvent: false
  			})
  		 ],
       
  		view: new View({
  			center: this.coords,
  			zoom: 4
  		})
      */
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

            // console.log(this.lat, this.lng);

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


        }, error => {
            console.error(error);
        });
    }
  }

  public getAddressFromLatLng() {
    if(this.hereCoords != "") {
        this.here.getAddressFromLatLng(this.hereCoords).then(result => {
            this.locations = <Array<any>>result;
            console.log(this.locations);
        }, error => {
            console.error(error);
        });
    }
  }


}
