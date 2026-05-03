import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  @Output() openChat = new EventEmitter();
  @Output() openContact = new EventEmitter();
  about: any;

  constructor(private profileService: ProfileService) {}

  ngOnInit() {
    this.profileService.getProfile()
      .subscribe(data => {
        this.about = data.about;
      });
  }
}
