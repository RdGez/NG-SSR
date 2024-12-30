import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { PokemonListComponent } from "../../modules/pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonsService } from '../../modules/pokemons/services/pokemons.service';
import { SimplePokemon } from '../../modules/pokemons/Interfaces';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { SkeletonComponent } from '../../modules/pokemons/components/pokemon-list/skeleton/skeleton.component';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, SkeletonComponent, RouterLink],
  templateUrl: './pokemons-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonsPageComponent {
  // Reference to know when the app is stable:
  // public isLoading = signal(true);
  // private _appRef = inject(ApplicationRef);
  // private appRef$ = this._appRef.isStable.subscribe((isStable) => {
  //   console.log('isStable', isStable);
  // });

  private _route = inject(ActivatedRoute);
  private _pokemonService = inject(PokemonsService);

  public pokemons = signal<SimplePokemon[]>([]);
  public currentPage = toSignal<number>(
    this._route.params.pipe(
      map(params => params['page'] ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page)) // Ensure page is at least 1
    )
  )

  public loadOnPageChange = effect(() => {
    this.loadPokemons();
  })

  // ngOnInit(): void {
  // setTimeout(() => {
  //   this.isLoading.set(false);
  // }, 5000);

  //   this.loadPokemons(0);
  // }

  public loadPokemons(pageChange = 0): void {
    let pageToLoad = this.currentPage()! + pageChange;
    pageToLoad = Math.max(1, pageToLoad);

    this._pokemonService
      .loadPage(pageToLoad)
      // .pipe(
      //     tap(() => this._title.setTitle(`Pokemon SRR - Page ${ pageToLoad }`))
      //   )
      .subscribe(pokemons => this.pokemons.set(pokemons));
  }
}
