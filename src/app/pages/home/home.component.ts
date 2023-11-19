import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import Point from '@arcgis/core/geometry/Point';
import Graphic from '@arcgis/core/Graphic';
import Locate from '@arcgis/core/widgets/Locate';
import Legend from '@arcgis/core/widgets/Legend';
import BasemapGallery from '@arcgis/core/widgets/BasemapGallery';
import LayerList from '@arcgis/core/widgets/LayerList';
import Expand from '@arcgis/core/widgets/Expand';
import * as geometryService from '@arcgis/core/rest/geometryService';
import DistanceParameters from '@arcgis/core/rest/support/DistanceParameters';
import { ShopsMapModalComponent } from 'src/app/shared/components/shops-map-modal/shops-map-modal.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {MatMenu, MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, HttpClientModule,
    MatRadioModule,MatMenuModule, MatSelectModule, MatDialogModule],
  providers: [HttpClient],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  cards!: any[];
  searchTerm: string = '';
  products!: any[];
  filteredCards!: any[];
  selectedOption!: string;
  categories: any[] = [
    { value: 'ropa', viewValue: 'Ropa' },
    { value: 'monitor', viewValue: 'Monitores' },
    { value: 'joyas', viewValue: 'Joyas' },
  ];

  position!: GeolocationPosition;

  constructor(private http: HttpClient,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPosition()
      .then((position: GeolocationPosition) => {
        this.position = position;
        console.log(`Latitud: ${this.position.coords.latitude}, Longitud: ${this.position.coords.longitude}`);
      })
      .catch((error: Error) => {
        console.error(error);
      });
    this.getProducts();
  }

  getProducts(): void {
    this.http.get<any[]>('https://apimocha.com/localtrade/products').subscribe(
      (response) => {
        this.cards = response;
        console.log('PROD', this.cards);
      },
      (error) => {
        console.log('Error fetching products:', error);
      }
    );
  }

  onOptionChange(event: any): void {
    this.searchTerm = event.value;
    const newCards = this.cards?.filter(card => {
      return card.category.toLowerCase().includes(event.value.toLowerCase());
    });
    if (this.position) {
      this.calculateDistances(newCards);
    }
  }



  onSubmit(form: NgForm) {
    this.searchTerm = form.value.searchTerm;
    const newCards = this.cards.filter(card => {
      return card.title.toLowerCase().includes(this.searchTerm.toLowerCase());
    });
    if (this.position) {
      this.calculateDistances(newCards);
    }
  }


  calculateDistances(cards: any) {
    this.filteredCards = cards?.map((card: any) => {
      const myPromise = new Promise((resolve, reject) => {
        const testPointUserInTazacorte: Point = new Point({
          latitude: this.position.coords.latitude,
          longitude: this.position.coords.longitude,
        });
        const url = 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer';
        const distParams = new DistanceParameters();
        distParams.geometry1 = testPointUserInTazacorte;
        distParams.distanceUnit = 'kilometers';
        distParams.geodesic = true;
        let shopUbication = new Point({
          latitude: card.coordinates.latitude,
          longitude: card.coordinates.longitude,
        });
        const geometrySrv = geometryService;
        distParams.geometry2 = shopUbication;
        resolve(geometrySrv.distance(url, distParams));
      });
      myPromise.then((value: any) => {
        card['distance'] = value.toFixed(2);
      });
      return card;
    });

    Promise.all(this.filteredCards?.map(card => card.distance))
      .then(() => {
        this.filteredCards.sort((a, b) => a.distance - b.distance);
      });

  }


  getPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!window || !window.navigator || !window.navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
      }
      window.navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  openDirections(coordinates: any): void {
    const origin = `${this.position.coords.latitude},${this.position.coords.longitude}`;
    const destination = `${coordinates.latitude},${coordinates.longitude}`;
    const url = this.generateDirectionsUrl(origin, destination);
    window.open(url, '_blank');
  }

  generateDirectionsUrl(origin: string, destination: string): string {
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
  }


  openDialog(cardCoordinates: string) {
    const dialogRef = this.dialog.open(ShopsMapModalComponent, {
      data: [this.filteredCards, this.position, cardCoordinates],
      //maxWidth: '100vw',
      //height: '100%',
      //width: '100%',
      //panelClass: 'full-screen-modal',
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
