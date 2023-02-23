import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { StudentGuard } from './shared/helpers/guards/student.guard';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./student-tabs/student-tabs.module').then(
        (m) => m.StudentTabsPageModule
      ),
    // canActivate: [StudentGuard],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      initialNavigation: 'enabledBlocking',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
