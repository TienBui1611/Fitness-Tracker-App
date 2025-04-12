// daily-goals.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoalService } from '../goal.service';

@Component({
  selector: 'app-daily-goals',
  templateUrl: './daily-goals.page.html',
  styleUrls: ['./daily-goals.page.scss'],
})
export class DailyGoalsPage implements OnInit {
  dailyGoals = {
    steps: 0,
    calories: 0,
    minutes: 0
  };

  constructor(private router: Router, private goalService: GoalService) {}

  async ngOnInit() {
    this.goalService.dailyGoals$.subscribe(goals => {
      this.dailyGoals = goals;
    });
  }

  async saveGoals() {
    await this.goalService.saveGoals(this.dailyGoals);
    this.router.navigate(['/workout-log']);
  }
}
