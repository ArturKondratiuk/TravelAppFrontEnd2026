import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonCol, IonRow, IonGrid, IonBadge } from '@ionic/angular/standalone';
import { DataService } from '../../services/data';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.page.html',
  styleUrls: ['./tours.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule, IonLabel, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput, IonCol, IonRow, IonGrid, IonBadge]
})

export class ToursPage implements OnInit {

  showLocation = false;
  loadedFromStorage: boolean = false;
  tours: any[] = [];
  location: any;

  booking = {
    name: '',
    email: '',
    tourId: ''
  };

  tourImages = [
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

  tourNames = [
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

  constructor(private dataService: DataService) { }

  async submitForm() {
    console.log('FORM DATA:', this.booking);

    await this.dataService.saveBooking(this.booking);

    this.booking = {
      name: '',
      email: '',
      tourId: ''
    };
  }

  async ngOnInit() {
    this.dataService.getTours().subscribe((data: any) => {
      this.tours = data.slice(0, 10).map((tour: any, index: number) => ({
        ...tour,
        customTitle: this.tourNames[index],
        image: this.tourImages[index]
      }));
    });

    const savedLocation = await this.dataService.getLocation();

    if (savedLocation) {
      this.location = savedLocation;
      this.loadedFromStorage = true;
    }
  }

  async getLocation() {
    console.log('BUTTON CLICKED');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        this.location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        console.log('LOCATION:', this.location);

        await this.dataService.saveLocation(this.location);
      },
      (error) => {
        console.log('ERROR:', error);
      }
    );
  }

}
