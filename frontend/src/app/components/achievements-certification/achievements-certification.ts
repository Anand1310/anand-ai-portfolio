import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

interface AchievementCertification {
  name: string;
  date: string;
  link: string;
}

@Component({
  selector: 'app-achievements-certification',
  imports: [],
  templateUrl: './achievements-certification.html',
  styleUrl: './achievements-certification.scss',
})

export class AchievementsCertifications {

  constructor(private profileService: ProfileService) {}

  achievements: AchievementCertification[] = [];
  certifications: AchievementCertification[] = [];

  ngOnInit() {
    this.profileService.getProfile()
      .subscribe(data => {
        this.achievements = data.achievements;
        this.certifications = data.certifications;
      });
  }

  openLink(url: string) {
    window.open(url, '_blank');
  }
}
