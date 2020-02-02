import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CardComponent } from './card/card.component';
import { TestComponent } from './test/test.component';
import { ContactComponent } from './contact/contact.component';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FindComponent } from './find/find.component';
import { HostComponent } from './host/host.component';
import { ViewComponent } from './view/view.component';

export const appRoutes: Routes = [
  {
    path: 'about',
    component: AboutComponent
  }, 
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'test',
    component: TestComponent
  },
  {
    path: 'search',
    component: SearchResultsComponent
  },
  {
    path: 'view/space/:id',
    component: ViewComponent
  },
  {
    path: 'find',
    component: FindComponent
  },
  {
    path: 'host',
    component: HostComponent
  },
  {
    path: 'space/:id',
    component: CardComponent
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
