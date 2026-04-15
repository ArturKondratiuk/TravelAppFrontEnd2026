import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCol } from '@ionic/angular/standalone';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.page.html',
  styleUrls: ['./tour-details.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCol ]
})
export class TourDetailsPage implements OnInit {

  tour: any;
  isFav: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.dataService.getTours().subscribe(async (data: any) => {

      const foundTour = data.find((item: any) => item.id === id);

      this.tour = {
        ...foundTour,
        image: this.getImage(id),
        customTitle: this.getTitle(id)
      };

      this.isFav = await this.dataService.isFavorite(this.tour.id);
    });
  }

  async toggleFavorite() {
    if (this.isFav) {
      await this.dataService.removeFromFavorites(this.tour);
      this.isFav = false;
    } else {
      await this.dataService.addToFavorites(this.tour);
      this.isFav = true;
    }
  }

  getImage(id: number) {
    const images = [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470',
    'https://images.unsplash.com/photo-1499856871958-5b9627545d1a',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    'https://images.unsplash.com/photo-1549693578-d683be217e58',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
    'https://images.unsplash.com/photo-1534430480872-3498386e7856',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c'
    ];

    return images[id - 1] || images[0];
  }

  getTitle(id: number) {
    const titles = [
      'Iceland Adventure',
    'Paris City Break',
    'Maldives Escape',
    'Japan Discovery',
    'Swiss Alps Tour',
    'New York Experience',
    'Epstein Island',
    'Rome Historical Tour',
    'Thailand Beaches',
    'Dubai Luxury Trip'
    ];

    return titles[id - 1] || 'Amazing Tour';
  }
}