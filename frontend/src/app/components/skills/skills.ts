import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { iconMap } from '../../../assets/icons';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills implements OnInit {

  skills: any;

  constructor(private profileService: ProfileService) {}
  
  ngOnInit() {
    this.profileService.getProfile()
      .subscribe(data => {
        if (data.skills && Array.isArray(data.skills)) {
          data.skills.forEach((skill: any) => {
            if (skill.items && Array.isArray(skill.items)) {
              skill.items.forEach((item: any) => {
                type IconKey = keyof typeof iconMap;
                const type: IconKey = item.type;
                item["icon"] = iconMap[type]
              });
            }
          });
          this.skills = data.skills
        }
      });
  }
}
