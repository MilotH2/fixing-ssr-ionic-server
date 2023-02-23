import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private menuController: MenuController) {}

  favorites(): void {}
  notifications(): void {
    console.log('mouseoout');
  }
  openMenu1() {
    this.menuController.enable(true, 'main-content');
    this.menuController.open();
  }
  openMenu2() {
    this.menuController.enable(true, 'main-content2');
    this.menuController.open();
  }
  ngOnInit() {}
}
