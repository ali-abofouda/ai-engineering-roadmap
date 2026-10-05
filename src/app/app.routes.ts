import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoadmapComponent } from './pages/roadmap/roadmap.component';
import { CinemaComponent } from './pages/cinema/cinema.component';
import { LibraryComponent } from './pages/library/library.component';
import { LanguagesComponent } from './pages/languages/languages.component';
import { PrinciplesComponent } from './pages/principles/principles.component';
import { StageDetailComponent } from './pages/stage-detail/stage-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'عقلي | My Digital Mind' },
  { path: 'tech', component: RoadmapComponent, title: 'الخريطة الذهنية | The Mind Map' },
  { path: 'roadmap', redirectTo: 'tech', pathMatch: 'full' },
  { path: 'cinema', component: CinemaComponent, title: 'روائع السينما | Curated Cinema' },
  { path: 'library', component: LibraryComponent, title: 'المكتبة والكتب | Library' },
  { path: 'languages', component: LanguagesComponent, title: 'اللغات والتواصل | Languages' },
  { path: 'principles', component: PrinciplesComponent, title: 'المبادئ والأفكار | Principles' },
  { path: 'stage/:id', component: StageDetailComponent, title: 'تفاصيل المحطة | Node Detail' },
  { path: '**', redirectTo: '' }
];
