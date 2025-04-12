import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';

declare let google: any;

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  workoutSessions: number[] = [];
  newWorkout: number | undefined;
  newWorkoutMonth: string | undefined;
  deleteMonth: string | undefined;
  currentInfoWindow: any; // Track the current open info window

  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  @ViewChild("map", { static: true }) mapElement: any;
  map: any;
  @ViewChild("healthGraph", { static: true }) canvas: any;
  chart: any;

  constructor() { }

  ngOnInit() {
    this.loadWorkoutData();
    let latLng = new google.maps.LatLng(-27.553041212929365, 153.05139296518655);
    let mapOptions = {
      center: latLng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // Custom marker icon for current location
    const currentLocationIcon = {
      path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
      fillColor: 'orange',
      fillOpacity: 1,
      scale: 9,
      strokeWeight: 1    
    };

    // Current location
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter(),
      icon: currentLocationIcon
    });
    let infoWindow1 = new google.maps.InfoWindow({
      content: '<h4>Your current location</h4>'
    });
    google.maps.event.addListener(marker, 'click', () => {
      this.closeCurrentInfoWindow();
      infoWindow1.open(this.map, marker);
      this.currentInfoWindow = infoWindow1;
    });

    // Gym
    let marker1 = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(-27.554766057826615, 153.0529136259138)
    });
    let infoWindow2 = new google.maps.InfoWindow({
      content: '<h4>Your gym</h4>'
    });
    google.maps.event.addListener(marker1, 'click', () => {
      this.closeCurrentInfoWindow();
      infoWindow2.open(this.map, marker1);
      this.currentInfoWindow = infoWindow2;
    });

    // Home
    let marker2 = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: new google.maps.LatLng(-27.55527732169643, 153.05179077151547)
    });
    let infoWindow3 = new google.maps.InfoWindow({
      content: '<h4>Your home</h4>'
    });
    google.maps.event.addListener(marker2, 'click', () => {
      this.closeCurrentInfoWindow();
      infoWindow3.open(this.map, marker2);
      this.currentInfoWindow = infoWindow3;
    });

    this.createChart();
  }

  // Load data into Chart
  loadWorkoutData() {
    const data = localStorage.getItem('workoutSessions');
    if (data) {
      this.workoutSessions = JSON.parse(data);
    } else {
      this.workoutSessions = Array(12).fill(0); // Default values if no data is found
    }
  }

  saveWorkoutData() {
    localStorage.setItem('workoutSessions', JSON.stringify(this.workoutSessions));
  }

  // Create Chart
  createChart() {
    this.chart = new Chart(this.canvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [{
          label: '# of workouts per month',
          data: this.workoutSessions,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(77, 20, 60, 0.2)',
            'rgba(20, 77, 207, 0.2)',
            'rgba(201, 30, 77, 0.2)',
            'rgba(98, 203, 150, 0.2)',
            'rgba(0, 0, 0, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgb(77, 20, 60)',
            'rgb(20, 77, 207)',
            'rgb(201, 30, 77)',
            'rgb(98, 203, 150)',
            'rgb(0, 0, 0)'
          ],
          borderWidth: 1
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
  }

  // Add info into Chart
  addWorkout() {
    if (this.newWorkout !== null && this.newWorkout !== undefined && this.newWorkoutMonth) {
      const monthIndex = this.months.indexOf(this.newWorkoutMonth);
      if (monthIndex !== -1) {
        this.workoutSessions[monthIndex] = this.newWorkout; // Set the workouts for the specified month
        this.chart.update();
        this.saveWorkoutData();
        this.newWorkout = undefined; // Clear input field after adding workout
        this.newWorkoutMonth = undefined; // Clear input field after adding workout
        console.log(this.workoutSessions);
      } else {
        alert('Invalid month');
        this.newWorkoutMonth = undefined; // Clear input field after adding workout
      }
    }
  }

  // Delete info in Chart
  deleteWorkoutByMonth() {
    if (this.deleteMonth) {
      const monthIndex = this.months.indexOf(this.deleteMonth);
      if (monthIndex !== -1 && monthIndex < this.workoutSessions.length) {
        this.workoutSessions[monthIndex] = 0; // Reset the workouts for the specified month
        this.chart.update();
        this.saveWorkoutData();
        this.deleteMonth = undefined; // Clear input field after deleting workout
        console.log(this.workoutSessions);
      }
    }
  }

  // Close the current info window
  closeCurrentInfoWindow() {
    if (this.currentInfoWindow) {
      this.currentInfoWindow.close();
      this.currentInfoWindow = null;
    }
  }
}
