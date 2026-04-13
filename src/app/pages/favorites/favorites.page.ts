import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton } from '@ionic/angular/standalone';
import { DataService } from '../../services/data';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule, IonList, IonItem, IonLabel, IonButton]
})

export class FavoritesPage implements OnInit {

  favorites: any[] = [];

  constructor(private dataService: DataService) { }

  async ionViewWillEnter() {
    this.favorites = await this.dataService.getFavorites();
  }

  ngOnInit() {
  }

  async remove(tour: any) {
    await this.dataService.removeFromFavorites(tour);
    this.favorites = await this.dataService.getFavorites();
  }

}
