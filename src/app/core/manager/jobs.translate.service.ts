import { Injectable } from '@angular/core'; 
import { Job } from './enums/job.enum';
@Injectable({
  providedIn: 'root',
})
export class JobsTranslateFactoryService {
  BASIC_JOB = Job;
  englishJobs = [
    { key: this.BASIC_JOB.UNEMPLOYED, en: 'Unemployed' },
    {
      key: this.BASIC_JOB.WORKSHOP_REPRESENTATIVE,
      en: 'Workshop Representative',
    },
    {
      key: this.BASIC_JOB.INSPECTION_CENTER_REPRESENTATIVE,
      en: 'Inspection Center Representative',
    },
    { key: this.BASIC_JOB.VSC_REPRESENTATIVE, en: 'VSC Representative' },
    {
      key: this.BASIC_JOB.CERTIFICATION_REPRESENTATIVE,
      en: 'Certification Representative',
    },
    { key: this.BASIC_JOB.CERTIFICATION_MANAGER, en: 'Certification Manager' },
    { key: this.BASIC_JOB.DEPUTY_GOVERNOR, en: 'Deputy Governor' },
    { key: this.BASIC_JOB.THIQAH_REPRESENTATIVE, en: 'System Manger' },
  ];
  constructor() {}
  getJob() {
    let job = this.englishJobs.filter((job) => {
      let userInfo: any = JSON.parse(localStorage.getItem('userInfo')!) || {};
      return job.key === userInfo?.job;
    });
    return job[0];
  }
}
