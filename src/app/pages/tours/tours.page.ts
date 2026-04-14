import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput } from '@ionic/angular/standalone';
import { DataService } from '../../services/data';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.page.html',
  styleUrls: ['./tours.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule, IonList, IonLabel, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonInput]
})

export class ToursPage implements OnInit {

  loadedFromStorage: boolean = false;
  tours: any[] = [];
  location: any;

  booking = {
    name: '',
    email: '',
    tourId: ''
  };

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
      this.tours = data.slice(0, 10);
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
