import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { MultimediaComponent } from './multimedia/multimedia.component';
import { ContactenosComponent } from './contactenos/contactenos.component';
import { FinalComponent } from './final/final.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular material
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule,MatGridListModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    ServiciosComponent,
    ProyectosComponent,
    MultimediaComponent,
    ContactenosComponent,
    FinalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule, 
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
