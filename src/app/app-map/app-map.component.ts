import { Component, OnInit } from '@angular/core';
import Map from 'ol/Map';
import View from 'ol/View';
import Tile from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj'

@Component({
  selector: 'app-map',
  templateUrl: './app-map.component.html',
  styleUrls: ['./app-map.component.css']
})
export class MapComponent implements OnInit {


	map;
  constructor() { }

  ngOnInit(): void {
  	this.initializeMap();
  }

  initializeMap(){
  	this.map = new Map({
  		target: 'map',
  		layers: [
  						new Tile({
					      source: new OSM()
					    })
  						],
  		view: new View({
  			center: fromLonLat([-78.86, 43.05]),
  			zoom: 4
  		})
  	});
  }

}
