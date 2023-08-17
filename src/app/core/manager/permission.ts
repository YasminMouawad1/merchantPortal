import { Resource } from './enums/resource.enum';
import { JobPermissionType } from './enums/job-permission-type.enum';

export class Permission {
  public resource: Resource;
  public permissions: JobPermissionType[];

  constructor(resource: Resource, permissions: JobPermissionType[]) {
    this.resource = resource;
    this.permissions = permissions;
  }
}
