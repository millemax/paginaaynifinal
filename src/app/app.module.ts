import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ProyectosComponent } from './proyectos/proyectos.component';
import { MultimediaComponent } from './multimedia/multimedia.component';
import { ContactenosComponent } from './contactenos/contactenos.component';
import { FinalComponent } from './final/final.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular material

import { NavebarComponent } from './navebar/navebar.component';
import { PruebaComponent } from './prueba/prueba.component';
import { Prueba2Component } from './prueba2/prueba2.component';
import { PiePaginaComponent } from './pie-pagina/pie-pagina.component';







@NgModule({
  declarations: [
    AppComponent,
    
    ProyectosComponent,
    MultimediaComponent,
    ContactenosComponent,
    FinalComponent,
    NavebarComponent,
    PruebaComponent,
    Prueba2Component,
    PiePaginaComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    

   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
