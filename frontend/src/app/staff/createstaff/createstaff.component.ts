import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StaffService } from '../../service/staff.service';
import { AuthService } from '../../auth/auth.service';
import { RoleService, Role } from '../../service/role.service';
import { MatSelectModule } from '@angular/material/select';
import { SnackbarService } from '../../service/snackbar.service';
import {
  FormBuilder,
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
    MatSelectModule,
    CommonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './createstaff.component.html',
  styleUrl: './createstaff.component.css'
})
export class CreatestaffComponent {
  form: FormGroup;
  roles: Role[] = [];
  errorMessage = signal('');

  private staffService = inject(StaffService);
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private roleService = inject(RoleService);
  private snackbarService = inject(SnackbarService);

  constructor() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      role_id: ['', Validators.required]
    });

    this.roleService.getAllRoles().subscribe({
      next: (roles) => this.roles = roles,
      error: (err) => this.errorMessage.set(err.message)
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

    const healthcareId = this.authService.getHealthcareId(); // Retrieve healthcareId

    if (!healthcareId) {
      this.errorMessage.set('Healthcare ID not found.');
      return;
    }

    this.staffService.createStaff({
      name: this.form.controls['name'].value ?? '',
      role_id: this.form.controls['role_id'].value ?? '',
      healthcenter_id: healthcareId,
    })
    .subscribe({
      next: () => {
        this.snackbarService.show('Staff created successfully!');
      },
      error: (err) => {
        console.error('Error creating staff:', err);
        this.snackbarService.show('Failed to create staff. Please try again');
      } 
    })
  }
}
