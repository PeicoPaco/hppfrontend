import { Component, OnInit } from '@angular/core';
import { StaffService, Staff } from '../service/staff.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staff',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent implements OnInit {
  staffList: Staff[] = [];

  constructor(private staffService: StaffService) {}

  ngOnInit(): void {
    this.loadStaff();
  }

  loadStaff(): void {
    this.staffService.getAllStaff().subscribe((data) => {
      this.staffList = data;
    });
  }
}
