import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from '../../modules/pokemons/Interfaces';
import { PokemonsService } from '../../modules/pokemons/services/pokemons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pokemon',
  imports: [],
  standalone: true,
  templateUrl: './pokemon-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonPageComponent implements OnInit {
  private _route = inject(ActivatedRoute)
  private _router = inject(Router);
  private _pokemonService = inject(PokemonsService);
  public pokemon = signal<Pokemon | null> (null);

  // Metadata Setup:
  private _title = inject(Title);
  private _meta = inject(Meta);

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');
    if (!id) this._router.navigate(['/']);

    this._pokemonService.loadPokemon(id!)
      .pipe(
        tap(({id, name}) => {
          const pageTitle = `${id} - ${name}`;
          const pageDescription = `Pokemon ${name}`;

          this._title.setTitle(pageTitle);
          this._meta.updateTag({ name: 'og:title', content: pageTitle });
          this._meta.updateTag({ name: 'description', content: pageDescription });
          this._meta.updateTag({ name: 'og:description', content: pageDescription });
          this._meta.updateTag({ name: 'og:image', content: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png` });
        })
      )
      .subscribe(this.pokemon.set);
  }
}

