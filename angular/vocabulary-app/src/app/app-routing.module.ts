import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecentlyAddedComponent } from './pages/recently-added/recently-added.component';
import { GoComponent } from './pages/go/go.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  { path: 'recently-added', component: RecentlyAddedComponent },
  { path: 'go', component: GoComponent },
  { path: 'settings', component: SettingsComponent },
  { path: '', redirectTo: '/recently-added', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
