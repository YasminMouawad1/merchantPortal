import { JobPermissionType } from '../enums/job-permission-type.enum';
import { Resource } from '../enums/resource.enum'; 
import { Permission } from '../permission'; 
import { JobPermissionBase } from './base.permissions';

export class CertificationManagerPermission extends JobPermissionBase {

  constructor() {
    super();
    this.permissions = [
      new Permission(Resource.ORDERS, [ 
        JobPermissionType.APPROVAL,
        JobPermissionType.APPROVING_ALL,
        JobPermissionType.RE_CERTIFICATION_REPRESENTATIVE
        
      ]) 
    ];
  }
}
