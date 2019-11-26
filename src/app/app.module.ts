import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { MultimediaComponent } from './multimedia/multimedia.component';
import { ContactenosComponent } from './contactenos/contactenos.component';
import { FinalComponent } from './final/final.component';
import { NavebarComponent } from './navebar/navebar.component';

@NgModule({
  declarations: [
    AppComponent,
    ServiciosComponent,
    ProyectosComponent,
    MultimediaComponent,
    ContactenosComponent,
    FinalComponent,
    NavebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
