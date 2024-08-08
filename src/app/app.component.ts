import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BienesComponent } from './bienes/bienes.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterModule,BienesComponent],
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'auraseguro-app';
}
