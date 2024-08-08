import { Component, OnInit } from '@angular/core';
import { BienesService, Bien } from '../servicios/bienes.service';

@Component({
  selector: 'app-bienes',
  templateUrl: './bienes.component.html',
  styleUrls: ['./bienes.component.css']
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
