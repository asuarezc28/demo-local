import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeDataService {
  private cardsSubject = new Subject<any[]>();
  cards$ = this.cardsSubject.asObservable();

  constructor() { }

  sendCards(cards: any[]) {
    this.cardsSubject.next(cards);
  }

  getCards() {
    return this.cards$;
  }
}

