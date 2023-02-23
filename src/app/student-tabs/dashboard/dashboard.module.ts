import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { PresentationSliderComponent } from './components/presentation-slider/presentation-slider.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    HeaderModule,
  ],
  declarations: [DashboardPage, PresentationSliderComponent],
})
export class DashboardPageModule {}
