import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopsMapModalComponent } from './shops-map-modal.component';

describe('ShopsMapModalComponent', () => {
  let component: ShopsMapModalComponent;
  let fixture: ComponentFixture<ShopsMapModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ShopsMapModalComponent]
    });
    fixture = TestBed.createComponent(ShopsMapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
