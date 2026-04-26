import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {
  @Output() openChat = new EventEmitter();
  @Output() openContact = new EventEmitter();
}
