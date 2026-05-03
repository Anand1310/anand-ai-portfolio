import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementsCertifications } from './achievements-certification';

describe('AchievementsCertification', () => {
  let component: AchievementsCertifications;
  let fixture: ComponentFixture<AchievementsCertifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AchievementsCertifications],
    }).compileComponents();

    fixture = TestBed.createComponent(AchievementsCertifications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
