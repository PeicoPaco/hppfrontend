import { Injectable } from '@angular/core';
import { RoleService } from './role.service';  // Import RoleService to fetch roles

@Injectable({
  providedIn: 'root'
})
export class RoleDictionaryService {
  private roleDictionary: { [key: string]: string } = {};  // In-memory dictionary for role IDs and names

  constructor(private roleService: RoleService) {}

  // Fetch roles from the API and store them in the dictionary
  initializeRoleDictionary(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.roleService.getAllRoles().subscribe({
        next: (roles) => {
          // Store roles in the dictionary with role ID as key and role name as value
          roles.forEach(role => {
            this.roleDictionary[role.id] = role.name;
          });
          
          localStorage.setItem('roleDictionary', JSON.stringify(this.roleDictionary));

          resolve();
        },
        error: (err) => {
          console.error('Error fetching roles:', err);
          reject(err);
        }
      });
    });
  }

  // Get role name by role ID
  getRoleName(roleId: string): string {
    return this.roleDictionary[roleId] || 'Unknown Role';  // Fallback for unknown role ID
  }

  //Load role dictionary from localStorage if available
  loadFromLocalStorage(): void {
    const storedRoles = localStorage.getItem('roleDictionary');
    if (storedRoles) {
      this.roleDictionary = JSON.parse(storedRoles);
    }
  }

  // Check if the dictionary is already initialized
  isInitialized(): boolean {
    return Object.keys(this.roleDictionary).length > 0;
  }
}
