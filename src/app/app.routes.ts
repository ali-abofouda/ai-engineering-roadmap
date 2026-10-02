import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { StageDetailComponent } from './pages/stage-detail/stage-detail.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { InterviewComponent } from './pages/interview/interview.component';
import { JobReadyComponent } from './pages/job-ready/job-ready.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { CourseCoverageComponent } from './pages/course-coverage/course-coverage.component';
import { MissingSkillsComponent } from './pages/missing-skills/missing-skills.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'AI Engineer Roadmap — From Fundamentals to Production AI' },
  { path: 'roadmap', component: RoadmapComponent, title: 'Visual Roadmap | AI Engineer Roadmap' },
  { path: 'stage/:id', component: StageDetailComponent, title: 'Stage Details | AI Engineer Roadmap' },
  { path: 'course-coverage', component: CourseCoverageComponent, title: '3-Course Coverage Matrix | AI Engineer Roadmap' },
  { path: 'missing-skills', component: MissingSkillsComponent, title: 'What Is Still Missing? | AI Engineer Roadmap' },
  { path: 'projects', component: ProjectsComponent, title: 'Portfolio Projects | AI Engineer Roadmap' },
  { path: 'interview', component: InterviewComponent, title: 'Interview Masterclass | AI Engineer Roadmap' },
  { path: 'job-ready', component: JobReadyComponent, title: 'Are You Job Ready? | AI Engineer Roadmap' },
  { path: 'resources', component: ResourcesComponent, title: 'Curated Resources | AI Engineer Roadmap' },
  { path: '**', redirectTo: '' }
];

