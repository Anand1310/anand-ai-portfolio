import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects implements OnInit {

  projects: any;
  
  constructor(private profileService: ProfileService) {}
  
  ngOnInit() {
    this.profileService.getProfile()
      .subscribe(data => {
        this.projects = data.projects;
      });
  }
}
