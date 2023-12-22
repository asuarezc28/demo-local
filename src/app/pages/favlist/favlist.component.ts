import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subscription } from 'rxjs';
import { HomeDataService } from 'src/app/shared/services/home-data.service';

@Component({
  selector: 'app-favlist',
  templateUrl: './favlist.component.html',
  styleUrls: ['./favlist.component.css'],
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, HttpClientModule,
    MatRadioModule, MatMenuModule, MatSelectModule, MatDialogModule],
})

export class FavlistComponent {

  constructor(private homeDataService: HomeDataService) { }

  private cardsSubscription!: Subscription;
  public cards: any[] = [];

  ngOnInit() {
    this.homeDataService.cards$.subscribe(cards => {
      this.cards = cards;
    });
  }
}
