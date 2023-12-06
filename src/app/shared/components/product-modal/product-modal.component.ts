import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent {
  productForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      name: '',
      email: '',
      description: ''
    });
  }

  submitForm() {
    console.log(this.productForm.value);
  }
}
