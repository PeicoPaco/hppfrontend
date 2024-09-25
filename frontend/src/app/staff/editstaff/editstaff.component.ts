import { Component, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StaffService } from '../../service/staff.service';
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
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editstaff',
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
  templateUrl: './editstaff.component.html',
  styleUrl: './editstaff.component.css'
})
export class EditstaffComponent {
  staffId: string;
  form: FormGroup;
  roles: Role[] = [];
  errorMessage = signal('');

  private staffService = inject(StaffService);
  private fb = inject(FormBuilder);
  private roleService = inject(RoleService);
  private snackbarService = inject(SnackbarService);

  constructor(route: ActivatedRoute) {
    this.staffId = route.snapshot.params['id'];

    this.form = this.fb.group({
      name: ['', Validators.required],
      role_id: ['', Validators.required]
    });

    this.roleService.getAllRoles().subscribe({
      next: (roles) => this.roles = roles,
      error: (err) => this.errorMessage.set(err.message)
    });

    this.fetchNote(); 
    
    merge(this.form.statusChanges, this.form.valueChanges)
      .pipe(takeUntilDestroyed())

    
  }

  fetchNote() {
    this.staffService.getStaffById(this.staffId).subscribe({
      next: (staff) => {
        this.form.patchValue({
          name: staff.name,
          role_id: staff.role_id,
        })
      },
      error: (error) => {
        console.error('Error fetching note:', error);
      },
    })
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.form.invalid) {
      this.form.markAllAsTouched();  // Mark all controls as touched to show validation errors
      return;
    }

    this.staffService.updateStaff(this.staffId, {
      name: this.form.controls['name'].value ?? '',
      role_id: this.form.controls['role_id'].value ?? '',
    })
    .subscribe({
      next: () => {
        this.snackbarService.show('Staff edited successfully!');
      },
      error: (err) => {
        console.error('Error editing staff:', err);
        this.snackbarService.show('Failed to edit staff. Please try again');
      } 
    })
  }
}
