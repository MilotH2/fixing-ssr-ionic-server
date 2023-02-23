import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})
export class ExploreContainerComponent implements OnInit {
  @Input() name: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  onOAuthBtnClick() {
    // this.authService.onOAuthBtnClick();
    this.authService.login();
  }

  // Refreshing tokens only works on iOS/Android for now
  onOAuthRefreshBtnClick() {
    // this.authService.onOAuthRefreshBtnClick();
  }

  onLogoutClick() {
    // this.authService.onLogoutClick();
  }
}
