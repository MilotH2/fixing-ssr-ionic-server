import { IonicModule, IonTabs } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentTabsPageRoutingModule } from './student-tabs-routing.module';

import { StudentTabsPage } from './student-tabs.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    StudentTabsPageRoutingModule,
  ],
  declarations: [StudentTabsPage],
  providers: [IonTabs],
})
export class StudentTabsPageModule {}
