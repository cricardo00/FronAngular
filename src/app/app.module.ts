import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BienesComponent } from './bienes/bienes.component'; // Importa el componente de bienes
import { provideHttpClient, HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule para las solicitudes HTTP
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Para animaciones (opcional)
import { FormsModule } from '@angular/forms'; // Importa FormsModule si usas formularios en la app


@NgModule({


  imports: [
    AppComponent,
    BrowserModule,
  ],

})
export class AppModule { }
