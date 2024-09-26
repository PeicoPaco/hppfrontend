import { Component, OnInit, inject } from '@angular/core';
import { StaffService, Staff } from '../service/staff.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../components/card/card.component';
import { RouterModule } from '@angular/router';
import { formatDateToMonthDay } from '../utilities/date-utils';
import { RoleDictionaryService } from '../service/role-dictionary.service';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule, CardComponent, RouterModule], 
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent implements OnInit {
  staffList: Staff[] = [];

  private roleDictionaryService = inject(RoleDictionaryService);

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.loadStaff();
    this.roleDictionaryService.loadFromLocalStorage();
  }

  loadStaff(): void {
    this.staffService.getAllStaff().subscribe((data) => {
      // Format the created_at and updated_at fields for each staff member
      this.staffList = data.map(staff => ({
        ...staff,
        role_id: this.roleDictionaryService.getRoleName(staff.role_id),
        created_at: formatDateToMonthDay(staff.created_at),
        updated_at: formatDateToMonthDay(staff.updated_at)
      }));
    });
  }
}
