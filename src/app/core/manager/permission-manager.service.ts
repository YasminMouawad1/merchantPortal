import { Injectable } from '@angular/core'; 
import { Job } from './enums/job.enum';
import { JobPermissionType } from './enums/job-permission-type.enum';
import { JobPermissionBase } from './jobs-permissions/base.permissions';
import { JobPermissionsFactory } from './jobs-permissions/factory.job-permissions';
import { Resource } from './enums/resource.enum';  

@Injectable()
export class JobPermissionManagerService {

  private permissions: JobPermissionBase;

  constructor() { 
    this.permissions = JobPermissionsFactory.getInstance();
  }

  isGranted(resource: Resource, permission: JobPermissionType) { 
    for (const res of this.permissions.permissions) {
      if (resource == res.resource) {
        for (const perm of res.permissions) {
          if (perm == permission) {
            return true;
          }
        }
      }
    }
    return false;
  }

  // authAs(role: Role) {
  //   localStorage.setItem('role',
  //     (role === null)
  //       ? Role.UNKNOWN
  //       : role
  //   );
  //   this.permissions = PermissionsFactory.getInstance();
  // }
  jobAs(job: Job) {
    localStorage.setItem('saso_job',
      (job === null)
        ? Job.UNEMPLOYED
        : job
    );
    this.permissions = JobPermissionsFactory.getInstance();
  }

}