import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StaffService } from '../../service/staff.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { merge } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-createstaff',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './createstaff.component.html',
  styleUrl: './createstaff.component.css'
})
export class CreatestaffComponent {
  form: FormGroup;

  errorMessage = signal('');

  private staffService = inject(StaffService);
  private fb = inject(FormBuilder)

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      role_id: ['', Validators.required]
    });

    // Subscribe to form status and value changes
    merge(this.form.statusChanges, this.form.valueChanges)
      .pipe(takeUntilDestroyed())
  }


  createStaffEvent(event: Event) {
    event.preventDefault();
    if (this.form.invalid) {
      this.form.markAllAsTouched();  // Mark all controls as touched to show validation errors
      return;
    }

    this.staffService.createStaff({
      name: this.form.controls['name'].value ?? '',
      role_id: this.form.controls['role_id'].value ?? '',
      healthcenter_id: '90ca2fcb-de37-4822-8352-309f06dd19fc',
    })
    .subscribe({
      error: (err) => this.errorMessage.set(err.message),
    })
  }
}
