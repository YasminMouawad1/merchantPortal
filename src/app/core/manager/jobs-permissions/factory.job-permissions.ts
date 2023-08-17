import { Job } from "../enums/job.enum";
import { JobPermissionBase } from "./base.permissions";
import { CertificationManagerPermission } from "./certification-manager.permissions";
import { CertificationRepresentativePermission } from "./certification-representative.permissions";
import { DeputyGovernorPermission } from "./deputy-governor.permissions";
import { ThiqahRepresentativePermission } from "./thiqah-representative.permissions";
import { UnemployedPermission } from "./unemployed.permissions";
import { VscRepresentativePermission } from "./vsc-representative.permissions";

 
export class JobPermissionsFactory {
  public static instance: JobPermissionBase;
  private constructor() {}

  public static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      const job = localStorage.getItem('saso_job');
      switch (job) {
        case Job.THIQAH_REPRESENTATIVE:
          this.instance = new ThiqahRepresentativePermission();
          break;
        case Job.DEPUTY_GOVERNOR:
          this.instance = new DeputyGovernorPermission();
          break;
        case Job.CERTIFICATION_MANAGER:
          this.instance = new CertificationManagerPermission();
          break;
        case Job.CERTIFICATION_REPRESENTATIVE:
          this.instance = new CertificationRepresentativePermission();
          break;
        case Job.VSC_REPRESENTATIVE:
          this.instance = new VscRepresentativePermission();
          break;
        case Job.UNEMPLOYED:
          this.instance = new UnemployedPermission();
          break;

        default:
          this.instance = new UnemployedPermission();
          break;
      }
      return this.instance;
    }
  }
}
