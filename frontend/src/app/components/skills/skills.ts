import { Component } from '@angular/core';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
})
export class Skills {
  skills = [
    {
      category: 'AI / ML',
      items: [
        { name: 'RAG Systems', level: 90, icon: '🧠' },
        { name: 'LangChain', level: 85, icon: '🔗' },
        { name: 'LangGraph', level: 80, icon: '🕸️' },
        { name: 'LLMs', level: 90, icon: '🤖' }
      ]
    },
    {
      category: 'Frontend',
      items: [
        { name: 'Angular', level: 85, icon: '🅰️' },
        { name: 'TypeScript', level: 85, icon: '📘' }
      ]
    },
    {
      category: 'Backend',
      items: [
        { name: 'FastAPI', level: 90, icon: '⚡' },
        { name: 'Python', level: 90, icon: '🐍' }
      ]
    }
  ];
}
