import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../shared.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  userProfile = {
    name: 'Tien Bui',
  };

  userEmail: string = '';
  avatarUrl: string | null = null;

  recentActivity = [
    { date: '2024-04-27', type: 'Cardio' },
    { date: '2024-04-26', type: 'Strength Training' },
    { date: '2024-04-25', type: 'Cardio' }
  ];

  constructor(private router: Router, private sharedService: SharedService) {}

  ngOnInit(): void {
    this.userEmail = this.sharedService.userEmail;
    this.loadAvatar();
  }

  navigateToStats() {
    this.router.navigate(['/stats']);
  }

  startWorkout() {
    this.router.navigate(['/workout-log']);
  }

  logout() {
    this.router.navigate(['/login']);
  }

  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos
    });

    if (image && image.webPath) {
      this.saveImage(image.webPath);
    }
  }

  async saveImage(webPath: string) {
    try {
      const response = await fetch(webPath);
      const blob = await response.blob();
      const base64Data = await this.convertBlobToBase64(blob) as string;

      const fileName = 'avatar.jpg';
      await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data
      });

      this.avatarUrl = webPath;
    } catch (error) {
      console.error('Error saving image', error);
    }
  }

  async loadAvatar() {
    try {
      const fileName = 'avatar.jpg';
      const file = await Filesystem.readFile({
        path: fileName,
        directory: Directory.Data
      });

      this.avatarUrl = `data:image/jpeg;base64,${file.data}`;
    } catch (error) {
      console.error('Error loading avatar', error);
    }
  }

  private convertBlobToBase64(blob: Blob): Promise<string | ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        const result = reader.result;
        if (result) {
          resolve(result);
        } else {
          reject(new Error('Failed to convert blob to base64'));
        }
      };
      reader.readAsDataURL(blob);
    });
  }
}
