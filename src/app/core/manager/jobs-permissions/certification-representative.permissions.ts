import { JobPermissionType } from '../enums/job-permission-type.enum';
import { Resource } from '../enums/resource.enum'; 
import { Permission } from '../permission';
import { JobPermissionBase } from './base.permissions';

export class CertificationRepresentativePermission extends JobPermissionBase {

  constructor() {
    super();
    this.permissions = [
      new Permission(Resource.ORDERS, [ 
        JobPermissionType.RE_MORE_INSPECTION_CENTER,
        JobPermissionType.APPROVAL,
        JobPermissionType.APPROVING_ALL,
        JobPermissionType.REJECT, 
        
      ]) 
    ];
  }
}
