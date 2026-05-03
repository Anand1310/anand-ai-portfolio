import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience implements OnInit {

  experienceList: any;

  constructor(private profileService: ProfileService) {}
  
  ngOnInit() {
    this.profileService.getProfile()
      .subscribe(data => {
        this.experienceList = data.experience;
      });
  }
}
