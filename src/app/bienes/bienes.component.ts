import { Component, OnInit } from '@angular/core';
import { BienesService, Bien } from '../servicios/bienes.service';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bienes',
  templateUrl: './bienes.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./bienes.component.scss']
})
export class BienesComponent implements OnInit {

  bienes: Bien[] = [];

  constructor(private bienesService: BienesService) { }

  ngOnInit(): void {
    this.bienesService.getBienes().subscribe((data: Bien[]) => {
      this.bienes = data;
    });
  }
}
