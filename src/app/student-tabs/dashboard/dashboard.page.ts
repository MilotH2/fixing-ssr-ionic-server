import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  didEnter: boolean = false;

  reviews: Array<any> = [
    {
      review: `I am proud to say that after a few monthsa wkudha kuwhdha wukdh kauwdkuhaw dukhakuwd hakuwhd kuahwd <b>ukhawuhkwhdkhwd kuahw dukhakuwdhkwhuhwdkahwa kwgdhakh</b> wdkuah wkuhdkhawk dhakw hdkauhw kudhawk uhdakuh w`,
      student: {
        firstName: 'Sllobodan',
        lastName: 'Milloshevic',
        profilePicture: null,
      },
      course: {
        title: 'coursetitle here awdku ahwdkuha wdkuahw d',
      },
    },
    {
      review: `I am proud to say that after a few monthsa wkudha kuwhdha wukdh kauwdkuhaw dukhakuwd hakuwhd kuahwd <b>ukhawuhkwhdkhwd kuahw dukhakuwdhkwhuhwdkahwa kwgdhakh</b> wdkuah wkuhdkhawk dhakw hdkauhw kudhawk uhdakuh w`,
      student: {
        firstName: 'Sllobodan',
        lastName: 'Milloshevic',
        profilePicture: null,
      },
      course: {
        title: 'coursetitle here awdku ahwdkuha wdkuahw d',
      },
    },
  ];
  courses: Array<any> = [
    {
      courseImage:
        'https://img-c.udemycdn.com/course/240x135/11475_9dac_15.jpg',
      title: 'Web Development Masterclass & CertificationsHTML',
      lecturer: 'Dollar Design School',
      assistent: 'Mark Lassoff',
      rate: 0.3,
      rateNr: 50984,
      price: 99.99,
    },
    {
      courseImage:
        'https://img-c.udemycdn.com/course/240x135/11475_9dac_15.jpg',
      title: 'Web Development Masterclass & CertificationsHTML',
      lecturer: 'Dollar Design School',
      assistent: 'Mark Lassoff',
      rate: 0.7,
      rateNr: 50984,
      price: 99.99,
    },
  ];
  isMobile: boolean = false;
  @HostListener('window:resize', ['$event'])
  onResize(event?: any) {
    console.log(event);
    this.isMobile = window.innerWidth <= 769 ? true : false;
  }

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private authService: AuthService
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.isLoggedInValue;
  }

  ionViewDidEnter() {
    this.didEnter = true;
  }
}
