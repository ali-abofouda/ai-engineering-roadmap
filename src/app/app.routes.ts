import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { CinemaComponent } from './pages/cinema/cinema.component';
import { StageDetailComponent } from './pages/stage-detail/stage-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'عقلي | My Digital Mind' },
  { path: 'tech', component: RoadmapComponent, title: 'الخريطة الذهنية | The Mind Map' },
  { path: 'roadmap', redirectTo: 'tech', pathMatch: 'full' },
  { path: 'cinema', component: CinemaComponent, title: 'الأفلام المختارة | Curated Cinema' },
  { path: 'stage/:id', component: StageDetailComponent, title: 'تفاصيل المحطة | Node Detail' },
  { path: '**', redirectTo: '' }
];
