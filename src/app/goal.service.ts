import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private dailyGoals = new BehaviorSubject<any>({
    steps: 0,
    calories: 0,
    minutes: 0
  });

  dailyGoals$ = this.dailyGoals.asObservable();

  constructor(private storage: Storage) {
    this.loadGoals();
  }

  async loadGoals() {
    await this.storage.create();
    const savedGoals = await this.storage.get('dailyGoals');
    if (savedGoals) {
      this.dailyGoals.next(savedGoals);
    }
  }

  async saveGoals(goals: any) {
    await this.storage.set('dailyGoals', goals);
    this.dailyGoals.next(goals);
  }
}
