import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel } from '@ionic/angular/standalone';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.page.html',
  styleUrls: ['./tours.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule, IonList, IonLabel]
})

export class ToursPage implements OnInit {

  tours: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getTours().subscribe((data: any) => {
      this.tours = data.slice(0, 10);
    });
  }
}
