import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StaffService, Staff } from '../../service/staff.service';

@Component({
  selector: 'app-editstaff',
  standalone: true,
  imports: [],
  templateUrl: './editstaff.component.html',
  styleUrl: './editstaff.component.css'
})
export class EditstaffComponent {
  staffId: string;
  // staffDetails: Staff;

  private staffService = inject(StaffService);

  constructor(route: ActivatedRoute) {
    this.staffId = route.snapshot.params['id'];
    // this.staffDetails = this.staffService.getStaffById(this.staffId)
  }
}
