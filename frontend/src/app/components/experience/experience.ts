import { Component } from '@angular/core';
import { ExperienceItem  } from '../../shared/models/experience.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.scss',
})
export class Experience {
  experienceList: ExperienceItem[] = [
    {
      role: 'Software Engineer',
      company: 'GEP Worldwide',
      duration: '2022 – Present',
      points: [
        'Built AI-driven automation for supplier onboarding → reduced manual effort by ~70%',
        'Developed agentic AI workflows using LLM integrations and backend APIs',
        'Designed scalable backend services and frontend interfaces for enterprise applications',
        'Led AI feature releases, improving adoption and system reliability'
      ]
    },
    {
      role: 'Software Engineer - Intern',
      company: 'GEP Worldwide',
      duration: '2019 – 2020',
      points: [
        'Built AI-driven automation for supplier onboarding → reduced manual effort by ~70%',
        'Developed agentic AI workflows using LLM integrations and backend APIs',
        'Designed scalable backend services and frontend interfaces for enterprise applications',
        'Led AI feature releases, improving adoption and system reliability'
      ]
    }
  ];
}
