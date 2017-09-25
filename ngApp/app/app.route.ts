import { provideRouter, RouterConfig } from '@angular/router';
import {Component1Component} from "./components/component1.component";
import {Component2Component} from "./components/component2.component";
import {DjangoComponent} from "./components/django.component";
import {CoordinatesComponent} from "./components/coordinates.component";


const routes: RouterConfig = [
  {path: '',redirectTo: '/coordinates',pathMatch: 'full'},
  { path: 'component1', component: Component1Component },
  { path: 'component2', component: Component2Component },
  { path: 'djcomponent', component: DjangoComponent },
  { path: 'coordinates', component: CoordinatesComponent }
];

export const appRouterProviders = [
  provideRouter(routes)
];
