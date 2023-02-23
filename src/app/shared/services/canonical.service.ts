import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CanonicalService {
  constructor(@Inject(DOCUMENT) private dom: any) {}

  setCanonicalURL(url?: string) {
    if (url) {
      console.log(url.split('/').join('/'));
    }
    // const remove: HTMLLinkElement = this.dom.remove('link');

    const canURL =
      url == undefined ? this.dom.URL : 'https://am-clothes.com' + url;
    const link: HTMLLinkElement = this.dom.createElement('link');
    // link.removeAttribute('canonical');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', canURL);
    this.dom.head.appendChild(link);
  }
}
