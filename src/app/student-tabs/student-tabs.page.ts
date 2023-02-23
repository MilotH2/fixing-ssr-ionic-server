import { Component, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { PublicService } from '../shared/services/public.service';

@Component({
  selector: 'app-student-tabs',
  templateUrl: 'student-tabs.page.html',
  styleUrls: ['student-tabs.page.scss'],
})
export class StudentTabsPage {
  @ViewChild('tabs', { static: true, read: IonTabs }) private tabsRef: IonTabs;
  tabChangeByFunctionSub: Subscription;
  constructor(public publicService: PublicService) {}

  ionViewDidLeave() {
    console.log('didLeave');
  }

  ionViewDidEnter() {
    console.log('didEneter');
    this.tabChangeByFunctionSub =
      this.publicService.changeTabObservable.subscribe((whereTo) => {
        console.log({ whereTo });
        if (whereTo) {
          this.tabsRef.select(whereTo);
        }
      });
  }
}
