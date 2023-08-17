import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core'; 
import { JobPermissionManagerService } from '../../core/manager/permission-manager.service';
@Directive({
  selector: '[appIsGranted]',
})
export class IsGrantedDirective {
  public isLoggedIn = false;
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    // private _authService: AuthService,
    
    private permissionManagerS: JobPermissionManagerService
  ) {
    // this._authService.getLoggedStatus().subscribe((status) => {
    //   this.isLoggedIn = status;
    // });
  }

  @Input() set appIsGranted(permission: Array<string>) {
    this.isGranted(permission);
  }

  private isGranted(permission: Array<string>) {
    let currentUserRole: string = sessionStorage.getItem('MASTER_ROLE')!;
    if (permission && permission.indexOf(currentUserRole) === -1) {
      this.viewContainer.clear();
    } else {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
/*
  ngOnInit() {
    //  We subscribe to the roles$ to know the roles the user has
    this.rolesService.roles$.pipe(takeUntil(this.stop$)).subscribe((roles) => {
      // If he doesn't have any roles, we clear the viewContainerRef
      if (!roles) {
        this.viewContainerRef.clear();
      }
      // If the user has the role needed to
      // render this component we can add it
      if (roles.includes(this.appHasRole)) {
        // If it is already visible (which can happen if
        // his roles changed) we do not need to add it a second time
        if (!this.isVisible) {
          // We update the `isVisible` property and add the
          // templateRef to the view using the
          // 'createEmbeddedView' method of the viewContainerRef
          this.isVisible = true;
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }
      } else {
        // If the user does not have the role,
        // we update the `isVisible` property and clear
        // the contents of the viewContainerRef
        this.isVisible = false;
        this.viewContainerRef.clear();
      }
    });
  }

  // Clear the subscription on destroy
  ngOnDestroy() {
    this.stop$.next();
  }*/
}
