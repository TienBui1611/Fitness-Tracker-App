import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  showSplash = true;

  constructor() {}

  ngOnInit() {
    // Hide the splash screen after 2 seconds
    setTimeout(() => {
      this.showSplash = false;
    }, 2000);
  }
}
