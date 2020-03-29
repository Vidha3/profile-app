import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
// import Control from 'ol/control/Control';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import DragPan from 'ol/interaction/DragPan';
import { fromLonLat } from 'ol/proj'

@Component({
  selector: 'app-map',
  templateUrl: './app-map.component.html',
  styleUrls: ['./app-map.component.css']
})
export class MapComponent implements OnInit {


	map;
	coords = fromLonLat([-74.01, 40.712742]);
	pnagar = fromLonLat([77.55, 12.91]);
  constructor() { }

  ngOnInit(): void {
  	this.initializeMap();
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
  	});
  }

}
