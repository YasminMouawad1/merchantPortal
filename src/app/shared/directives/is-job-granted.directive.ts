import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'; 
import { JobPermissionType } from '../../core/manager/enums/job-permission-type.enum';
import { JobPermissionManagerService } from '../../core/manager/permission-manager.service';
import { Resource } from '../../core/manager/enums/resource.enum';
@Directive({
  selector: '[isJobGranted]'
})
export class IsJobGrantedDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionManagerS: JobPermissionManagerService
  ) { }

  @Input() set isJobGranted(permission: Array<string>) {
    this.isGranted(
      permission[0] as Resource,
      permission[1] as JobPermissionType
    );
  }

  private isGranted(resource: Resource, permissionType: JobPermissionType) {  
    if (this.permissionManagerS.isGranted(resource, permissionType)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}