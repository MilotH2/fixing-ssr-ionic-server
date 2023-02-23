import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WindowService {
  constructor(@Inject(DOCUMENT) private _doc: Document) {}

  getWindow(): Window | null {
    return this._doc.defaultView;
  }

  getLocation(): Location {
    return this._doc.location;
  }

  createElement(tag: string): HTMLElement {
    return this._doc.createElement(tag);
  }
}
