import {Component, OnInit} from '@angular/core';
import * as L from 'leaflet';
import * as esri from 'esri-leaflet';
import {DragEndEvent} from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: L.Map;

  osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'Open Street Map'});

  ocm = L.tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', {maxZoom: 18, attribution: 'Open Cycle Map'});

  topo = esri.basemapLayer('Topographic');

  center = L.latLng([52.3486833, 10.184336]);

  zoom = 12;

  bounds = undefined;

  layersControl = {
    baseLayers: {
      'Open Street Map': this.osm,
      'Open Cycle Map': this.ocm,
      Topographic: this.topo
    },
    overlays: {}
  };

  options = {
    layers: [
      this.osm
    ],
    zoom: this.zoom,
    center: this.center
  };

  layers: L.Layer[] = [];

  constructor() {
  }

  ngOnInit(): void {
    console.log('ngOnInit called');
  }

  onMapReady(map: L.Map) {
    console.log('onMapReady called');
    this.map = map;

    // new center
    navigator.geolocation.getCurrentPosition(
      position => {
        this.center = L.latLng(position.coords.latitude, position.coords.longitude);
        this.addMarker();
      },
      error => {
      },
      {
        timeout: 10000
      }
    );
  }

  addMarker() {
    const popupMarker = L.marker(
      [ this.center.lat + 0.1 * (Math.random() - 0.5), this.center.lng + 0.1 * (Math.random() - 0.5) ],
      {
        icon: L.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/marker-icon.png',
          shadowUrl: 'assets/marker-shadow.png'
        }),
        title: 'Popup Marker'
      }
    );
    //  popupMarker.bindPopup(layer => 'Ich bin ein Popup.');
    popupMarker.bindPopup(layer => L.Util.template('<p>Hi {firstname} {lastname}</p>', {
      firstname: 'Christian',
      lastname: 'Bremer'
    }));
    this.layers.push(popupMarker);

    const imgMarker = L.marker(
      [ this.center.lat + 0.1 * (Math.random() - 0.5), this.center.lng + 0.1 * (Math.random() - 0.5) ],
      {
        icon: L.icon({
          iconSize: [ 25, 41 ],
          iconAnchor: [ 13, 41 ],
          iconUrl: 'assets/circle_blue.svg'
        }),
        title: 'Draggable Route Point',
        draggable: true
      }
    );
    imgMarker.bindPopup(layer => 'Ich bin draggable.');
    imgMarker.on('dragend', event => {
      const e = event as DragEndEvent;
      console.log(event);
      console.log(event.target._latlng);
    }, context => {
      console.log(context);
    });
    this.layers.push(imgMarker);
  }

  removeMarker() {
    this.layers.pop();
  }

  layerAdded(event: any) {
    console.log('Added layer event: ' + event);
  }

  layerRemoved(event: any) {
    console.log('Removed layer event: ' + event);
  }

}
