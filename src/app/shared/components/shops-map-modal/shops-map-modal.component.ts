import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
@Component({
  selector: 'app-shops-map-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './shops-map-modal.component.html',
  styleUrls: ['./shops-map-modal.component.css']
})
//@ViewChild('mapViewNode', { static: true })

export class ShopsMapModalComponent implements OnInit {
  public myMap!: Map;
  public position: any;
  @ViewChild('mapViewNode', { static: true }) mapViewEl: ElementRef | undefined;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    console.log('data', data);
  }


  ngOnInit(): void {
    this.initMap();

  }

  initMap(): Promise<any> {
    this.position = this.data[1];
    console.log('POSI', this.position);
    const container = this.mapViewEl?.nativeElement;
    this.myMap = new Map({
      basemap: 'satellite',
      layers: []
    })

    const view = new MapView({
      container,
      map: this.myMap,
      zoom: 11,
      center: [-17.93, 28.66],
    });

    const featureLayer = new FeatureLayer({
      source: [], // Los datos se agregarán más adelante
      objectIdField: 'id',
      geometryType: 'point',
      spatialReference: { wkid: 4326 },
      fields: [
        { name: 'id', type: 'oid' },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'image', type: 'string' },
        { name: 'price', type: 'double' }
      ],
    });
    console.log('FEAA', featureLayer);
    this.myMap.add(featureLayer);

    const pointUser = new Point({
      x: this.position.coords.longitude,
      y: this.position.coords.latitude,
      spatialReference: { wkid: 4326 }
    });


    const markerSymbolUserUbication = {
      type: 'simple-marker',
      size: 20,
      color: [0, 0, 255],
      outline: {
        color: [255, 255, 255],
        width: 2,
      },
    };


    const graphicUser = new Graphic({
      geometry: pointUser,
      symbol: markerSymbolUserUbication
    });


    featureLayer.source.add(graphicUser);

    this.data[0]?.forEach((marker: { coordinates: { longitude: any; latitude: any; }; id: any; title: any; description: any; image: any; price: any; }) => {
      const point = new Point({
        x: marker.coordinates.longitude,
        y: marker.coordinates.latitude,
        spatialReference: { wkid: 4326 }
      });

      const attributes = {
        id: marker.id,
        title: marker.title,
        description: marker.description,
        image: marker.image,
        price: marker.price
      };

      const graphic = new Graphic({
        geometry: point,
        attributes
      });

      featureLayer.source.add(graphic);
      const query = featureLayer.createQuery();
      query.where = "id = '" + this.data[2] + "'";
      featureLayer.queryFeatures(query).then((response) => {
        const features = response.features[0];
        const Sym = new SimpleMarkerSymbol({
          // type: "simple-marker",
          color: "red",
          size: 12,
          outline: {
            width: 0.5,
            color: "red",
          },
        });
        features.symbol = Sym;
        // const graphs = view.graphics.items;
        //const graphicsToDelete = graphs.filter(
        //(graph) => graph.symbol?.size !== 12
        //);
        //graphicsToDelete.forEach((item) => {
        //this.view.graphics.remove(item);
        //});
        //this.view.graphics.removeAll();
        view.graphics.add(features);
        view.goTo({
          target: features,
          zoom: 16,
        });
      });
    });
    return view.when();
  }

}
//  renderer: {
//type: 'simple',
//symbol: {
//type: 'picture-marker',
//url: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
//width: '32px',
//height: '32px'
//},
//},
//  popupTemplate: new PopupTemplate({
//title: '{title}',
//content: '<p>{description}</p><img src="{image}" alt="Product Image"><p>Price: ${price}</p>'
//})
