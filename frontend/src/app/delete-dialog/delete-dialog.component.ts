import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogClose, MatDialogActions, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css'
})
export class DeleteDialogComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Output() deleteUser: EventEmitter<string> = new EventEmitter();
}
