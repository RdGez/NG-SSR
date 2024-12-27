import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'pokemons/page/:page',
    loadComponent: () => import('./pages/pokemons/pokemons-page.component').then(m => m.PokemonsPageComponent)
  },
  {
    path: 'pokemons/:id',
    loadComponent: () => import('./pages/pokemon/pokemon-page.component').then(m => m.PokemonPageComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page.component').then(m => m.AboutPageComponent)
  },
  {
    path: 'pricing',
    loadComponent: () => import('./pages/pricing/pricing-page.component').then(m => m.PricingPageComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page.component').then(m => m.ContactPageComponent)
  },
  {
    path: '**',
    redirectTo: 'about',
  }
];
