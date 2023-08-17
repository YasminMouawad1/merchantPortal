import { Resource } from '../enums/resource.enum'; 
import { Permission } from '../permission';
import { JobPermissionBase } from './base.permissions';

export class UnemployedPermission extends JobPermissionBase {
  constructor() {
    super();
    this.permissions = [new Permission(Resource.ORDERS, [])];
  }
}
