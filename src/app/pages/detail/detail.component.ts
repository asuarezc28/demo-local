import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeDataService } from 'src/app/shared/services/home-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, MatIconModule, FormsModule,
    MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, HttpClientModule,
    MatRadioModule, MatMenuModule, MatSelectModule, MatDialogModule],
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  constructor(private homeDataService: HomeDataService) { }

  private cardsSubscription!: Subscription;
  public cards: any[] = [];

  ngOnInit() {
    this.homeDataService.cards$.subscribe(cards => {
      this.cards = cards;
      console.log('this.cards', this.cards);
    });
  }
}




