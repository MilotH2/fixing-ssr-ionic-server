import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentTabsPage } from './student-tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: StudentTabsPage,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => m.DashboardPageModule
          ),
      },
      // {
      //   path: 'cart',
      //   loadChildren: () =>
      //     import('./cart/cart.module').then((m) => m.CartPageModule),
      // },

      // {
      //   path: 'my-courses',
      //   loadChildren: () =>
      //     import('./my-courses/my-courses.module').then(
      //       (m) => m.MyCoursesPageModule
      //     ),
      // },
      // {
      //   path: 'playing-now',
      //   loadChildren: () =>
      //     import('./playing-now/playing-now.module').then(
      //       (m) => m.PlayingNowPageModule
      //     ),
      // },
      // {
      //   path: 'profile',
      //   loadChildren: () =>
      //     import('../pages/profile/profile.module').then(
      //       (m) => m.ProfilePageModule
      //     ),
      // },
      // {
      //   path: 'course-details',
      //   loadChildren: () =>
      //     import('../pages/course-details/course-details.module').then(
      //       (m) => m.CourseDetailsPageModule
      //     ),
      // },
      {
        path: '',
        redirectTo: '/tabs/dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class StudentTabsPageRoutingModule {}
