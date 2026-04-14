import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  private _storage: Storage | null = null;

  constructor(private http: HttpClient, private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  async ready() {
    if (!this._storage) {
      await this.init();
    }
  }

  getTours(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  async addToFavorites(tour: any) {
    const favorites = await this._storage?.get('favorites') || [];

    const exists = favorites.find((item: any) => item.id === tour.id);

    if (!exists) {
      favorites.push(tour);
      await this._storage?.set('favorites', favorites);
    }
  }

  async removeFromFavorites(tour: any) {
    let favorites = await this._storage?.get('favorites') || [];

    favorites = favorites.filter((item: any) => item.id !== tour.id);

    await this._storage?.set('favorites', favorites);
  }

  async isFavorite(id: number) {
    const favorites = await this._storage?.get('favorites') || [];
    return favorites.some((item: any) => item.id === id);
  }

  async getFavorites() {
    return await this._storage?.get('favorites') || [];
  }

  async saveLocation(location: any) {
    await this.ready();
    await this._storage?.set('location', location);
  }

  async getLocation() {
    await this.ready();
    return await this._storage?.get('location');
  }
}