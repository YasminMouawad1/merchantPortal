import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard {
  access(permission: Array<string>): boolean {
    let currentUserRole: string = sessionStorage.getItem('MASTER_ROLE')!;
    if (permission && permission.indexOf(currentUserRole) === -1) {
      return false;
    } else {
      return true;
    }
  }
}
