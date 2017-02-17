import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneratorComponent } from './generator/generator.component';
import { WallBreakerComponent } from './wall-breaker/wall-breaker.component';
import { HomeComponent } from './home/home.component';

// Route Configuration
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'generator', component: GeneratorComponent },
  { path: 'wallbreaker', component: WallBreakerComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);