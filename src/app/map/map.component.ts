import { Component, OnInit } from '@angular/core';
import {Circle, circle, icon, latLng, marker, polygon, popup, tileLayer} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      // 'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
      // 'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
      // 'My Marker': marker([ 46.879966, -121.726909 ])
      'My Marker': marker([ 46.879966, -121.726909 ], {
        icon: icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
        }),
        draggable: true,
        bubblingMouseEvents: true,
        interactive: true
      })
    }
  };

  l0: Circle = circle([ 46.95, -122 ], { radius: 5000 });

  layers = [
    this.l0, // circle([ 46.95, -122 ], { radius: 5000 }),
    polygon([[ 46.8, -121.85 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]])
  ];

  constructor() { }

  ngOnInit(): void {
    this.l0.bindPopup(popup({
      closeButton: true
    }));
    // this.l0.op
  }

  handleClick(event: any) {
    console.log(event);
  }
}
