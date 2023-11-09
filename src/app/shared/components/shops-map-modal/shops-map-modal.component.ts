import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-shops-map-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './shops-map-modal.component.html',
  styleUrls: ['./shops-map-modal.component.css']
})
export class ShopsMapModalComponent {
  constructor(public dialog: MatDialog) { }

  //  openDialog() {
  //const dialogRef = this.dialog.open(DialogContentExampleDialog);

  //dialogRef.afterClosed().subscribe(result => {
  //console.log(`Dialog result: ${result}`);
  //});
  //}
}
