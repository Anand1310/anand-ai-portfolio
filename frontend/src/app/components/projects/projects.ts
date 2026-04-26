import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {
  projects = [
    {
      title: 'AI Portfolio Assistant',
      description: 'An AI-powered personal assistant that answers questions about my experience using RAG and memory.',
      highlights: [
        'Built RAG pipeline using resume + project data',
        'Implemented session-based memory for contextual conversations',
        'Integrated FastAPI backend with Angular frontend'
      ],
      tech: ['Angular', 'FastAPI', 'LangChain', 'RAG'],
      github: 'https://github.com/your-repo',
      live: ''
    },
    {
      title: 'Agentic AI Workflow System',
      description: 'Multi-agent system capable of tool calling and dynamic decision making.',
      highlights: [
        'Designed agent orchestration using LangGraph',
        'Implemented tool calling (calculator + retrieval)',
        'Built modular architecture for extensibility'
      ],
      tech: ['Python', 'LangGraph', 'LLMs'],
      github: '',
      live: ''
    }
  ];
}
