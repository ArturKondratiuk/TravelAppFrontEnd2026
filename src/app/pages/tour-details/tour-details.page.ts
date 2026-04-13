import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.page.html',
  styleUrls: ['./tour-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule]
})

export class TourDetailsPage implements OnInit {
 tour: any;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.dataService.getTours().subscribe((data: any) => {
      this.tour = data.find((item: any) => item.id == id);
    });
  }
}
