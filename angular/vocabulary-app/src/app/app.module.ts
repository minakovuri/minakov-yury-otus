import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoComponent } from './pages/go/go/go.component';
import { RecentlyAddedComponent } from './pages/recently-added/recently-added/recently-added.component';
import { SettingsComponent } from './pages/settings/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    GoComponent,
    RecentlyAddedComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
