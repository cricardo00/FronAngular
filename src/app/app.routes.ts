import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ModuloComponent } from './modulo/modulo.component';
import { BienesComponent } from './bienes/bienes.component';
import { AjusteComponent } from './ajuste/ajuste.component';
import { IncendioComponent } from './incendio/incendio.component';
import { EditarBienComponent } from './editar-bien/editar-bien.component';

export const routes: Routes = [
  // Ruta para la página principal
  { path: '', component: HomeComponent },

  // Ruta para el componente Modulo
  { path: 'modulo', component: ModuloComponent },

  // Ruta para el componente Ajuste
  { path: 'ajustes', component: AjusteComponent },

  // Ruta para el componente Bienes
  { path: 'bienes', component: BienesComponent },

  // Ruta para el componente Incendio
  { path: 'incendio', component: IncendioComponent },

  // Ruta para el componente EditarBien
  // Nota: La ruta 'editar' puede ser redundante si ya tienes 'editar-bien/:codigo'
  { path: 'editar-bien/:codigo', component: EditarBienComponent },

  // Ruta por defecto para manejar URLs no encontradas
  { path: '**', redirectTo: '' } // Redirige a la página principal si la ruta no existe
];
