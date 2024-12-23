import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { PokemonListComponent } from "../../modules/pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonsService } from '../../modules/pokemons/services/Pokemons.service';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsPageComponent implements OnInit {
  // Reference to know when the app is stable:
  // public isLoading = signal(true);
  // private _appRef = inject(ApplicationRef);
  // private appRef$ = this._appRef.isStable.subscribe((isStable) => {
  //   console.log('isStable', isStable);
  // });

  private _pokemonService = inject(PokemonsService);

  ngOnInit(): void {
    // setTimeout(() => {
      //   this.isLoading.set(false);
      // }, 5000);

      this.loadPokemons();
  }

  public loadPokemons(page = 0): void {
    this._pokemonService.loadPage(page)
      .subscribe( pokemons => console.log(pokemons));
  }
 }
