import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-workout-log',
  templateUrl: './workout-log.page.html',
  styleUrls: ['./workout-log.page.scss'],
})
export class WorkoutLogPage implements OnInit {
  workouts = [
    { id: 1, date: '2024-04-27', type: 'Cardio' },
    { id: 2, date: '2024-04-26', type: 'Strength Training' },
    { id: 3, date: '2024-04-25', type: 'Cardio' }
  ];

  dailyGoals = {
    steps: 0,
    calories: 0,
    minutes: 0
  };

  constructor(
    private alertController: AlertController,
    private sharedService: SharedService,
    private router: Router,
    private goalService: GoalService
  ) {}

  // Instantly apply changes to daily-goals
  async ngOnInit() {
    this.workouts = await this.sharedService.getWorkouts();
    this.goalService.dailyGoals$.subscribe(goals => {
      this.dailyGoals = goals;
    });
  }

  // Navigates to daily-goals
  navigateToDailyGoals() {
    this.router.navigate(['/daily-goals']);
  }

  // Appends the list
  async addWorkout() {
    const prompt = await this.alertController.create({
      header: 'Add Workout',
      inputs: [
        {
          name: 'date',
          type: 'date',
          placeholder: 'Date'
        },
        {
          name: 'type',
          type: 'text',
          placeholder: 'Type'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Add workout canceled');
          }
        },
        {
          text: 'Add',
          handler: async (data) => {
            const newWorkoutId = this.workouts.length > 0 ? Math.max(...this.workouts.map(workout => workout.id)) + 1 : 1;
            this.workouts.push({ id: newWorkoutId, ...data });
            await this.sharedService.saveWorkouts(this.workouts);
          }
        }
      ]
    });
  
    await prompt.present();
  }

  // Edits the list
  async editWorkout(workout: any) {
    const prompt = await this.alertController.create({
      header: 'Edit Workout',
      inputs: [
        {
          name: 'date',
          type: 'date',
          value: workout.date
        },
        {
          name: 'type',
          type: 'text',
          value: workout.type,
          placeholder: 'Type'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Edit canceled');
          }
        },
        {
          text: 'Save',
          handler: async (data) => {
            workout.date = data.date;
            workout.type = data.type;
            await this.sharedService.saveWorkouts(this.workouts);
          }
        }
      ]
    });

    await prompt.present();
  }

  // Deletes list item
  async deleteWorkout(workout: any) {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete this workout session?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel delete');
          }
        }, {
          text: 'Delete',
          handler: async () => {
            this.workouts = this.workouts.filter(item => item.id !== workout.id);
            await this.sharedService.saveWorkouts(this.workouts);
          }
        }
      ]
    });

    await alert.present();
  }

  // Deletes all the list items
  async deleteAllWorkouts() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Are you sure you want to delete all workout sessions?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancel delete all');
          }
        }, {
          text: 'Delete All',
          handler: async () => {
            // Clear all workout sessions from the workouts array
            this.workouts = [];
            // Save workouts to storage
            await this.sharedService.saveWorkouts(this.workouts);
          }
        }
      ]
    });
  
    await alert.present();
  }
}
