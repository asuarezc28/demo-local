import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavlistComponent } from './favlist.component';

describe('FavlistComponent', () => {
  let component: FavlistComponent;
  let fixture: ComponentFixture<FavlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavlistComponent]
    });
    fixture = TestBed.createComponent(FavlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
