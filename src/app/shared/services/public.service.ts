import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicService {
  currentTabSubject: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);
  changeTabObservable: Observable<string | null> =
    this.currentTabSubject.asObservable();

  constructor() {}

  changeTab(whereTo: string): void {
    this.currentTabSubject.next(whereTo);
  }
}
