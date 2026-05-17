import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-failure',
  imports: [],
  templateUrl: './failure.html',
  styleUrl: './failure.scss',
})
export class Failure {

  @Output()
  reloadProfile = new EventEmitter<void>();

  retryLoad() {
    this.reloadProfile.emit();
  }
}
