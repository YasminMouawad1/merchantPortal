import { Injectable, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DOCUMENT } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { environment } from 'projects/public/src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  constructor(
    private translateService: TranslateService,
    private titleService: Title,
    @Inject(DOCUMENT) private document: Document
  ) { }

  getCurrnetLang() {
    let lang = this.translateService.currentLang
      ? this.translateService.currentLang
      : JSON.parse(localStorage.getItem('DEFAULT_LANGUAGE')!)
        ? JSON.parse(localStorage.getItem('DEFAULT_LANGUAGE')!)
        : environment.language;
    return lang || 'ar';
  }

  loadDefaultLangAndStylesDirection() {
    this.setLangsAndStyles();
  }

  isDefaultLang() {
    return this.translateService.currentLang === 'ar' ? true : false;
  }

  switchLanguageAndStyleDir(): void {
    let lang = this.translateService.currentLang === 'en' ? 'ar' : 'en';
    this.setLangsAndStyles(lang);
  }

  onLangChange() {
    return this.translateService.onLangChange;
  }

  private setLangsAndStyles(lang: string = this.getCurrnetLang()): void {
    localStorage.setItem('DEFAULT_LANGUAGE', JSON.stringify(lang));
    this.translateService.setDefaultLang(lang);
    this.setStylesDirections(lang);
  }

  private setStylesDirections(lang: string): void {
    let htmlTag = document.getElementsByTagName('html');
    if (lang === 'ar') {
      htmlTag[0].classList.remove('ltr');
      htmlTag[0].classList.add('rtl');
      htmlTag[0].setAttribute('lang', lang);
      this.loadStyle('rtl-style.css');
      //   location.pathname = location.pathname.replace(/.*?\/en\/.*?/gi, '/ar/');
      // this.titleService.setTitle(environment.arTitle);
    } else {
      htmlTag[0].classList.remove('rtl');
      htmlTag[0].classList.add('ltr');
      htmlTag[0].setAttribute('lang', 'ar');
      this.loadStyle('ltr-style.css');
      //   location.pathname = location.pathname.replace(/.*?\/ar\/.*?/gi, '/en/');
      // this.titleService.setTitle(environment.enTitle);
    }
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
    // this.language.setLang(lang);
    // this.location.go(location.pathname);
  }

  private loadStyle(styleName: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'client-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = styleName;
    } else {
      const style = this.document.createElement('link');
      style.id = 'client-theme';
      style.rel = 'stylesheet preload';
      style.as = 'style';

      style.href = `${styleName}`;

      head.appendChild(style);
    }
  }
}
