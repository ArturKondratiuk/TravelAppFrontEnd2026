import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCol, IonRow, IonGrid } from '@ionic/angular/standalone';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [ IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCol, IonRow, IonGrid ]
})

export class FavoritesPage implements OnInit {

  favorites: any[] = [];

  constructor(private dataService: DataService) { }

  async ionViewWillEnter() {
    this.favorites = await this.dataService.getFavorites();
  }

  ngOnInit() {
    this.favorites = this.favorites.map((tour: any) => ({
      ...tour,
      image: this.getImage(tour.id),
      customTitle: this.getTitle(tour.id)
    }));
  }

  async remove(tour: any) {
    await this.dataService.removeFromFavorites(tour);
    this.favorites = await this.dataService.getFavorites();
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
