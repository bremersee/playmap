import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MenubarModule} from 'primeng/menubar';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import {HeaderComponent} from './header/header.component';
import {MapComponent} from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LeafletModule,
    MenubarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
