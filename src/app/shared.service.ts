import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  userEmail: string = '';

  dailyGoals = {
    steps: 10000,
    calories: 2000
  };

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  async getWorkouts() {
    return await this.storage.get('workouts') || [];
  }

  async saveWorkouts(workouts: any[]) {
    await this.storage.set('workouts', workouts);
  }
}
