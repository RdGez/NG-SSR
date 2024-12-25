import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { PokemonListComponent } from "../../modules/pokemons/components/pokemon-list/pokemon-list.component";
import { PokemonsService } from '../../modules/pokemons/services/Pokemons.service';
import { SimplePokemon } from '../../modules/pokemons/Interfaces';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { SkeletonComponent } from '../../modules/pokemons/components/pokemon-list/skeleton/skeleton.component';

@Component({
  selector: 'pokemons-page',
  standalone: true,
  imports: [PokemonListComponent, SkeletonComponent],
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

  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _title = inject(Title);
  private _pokemonService = inject(PokemonsService);

  public pokemons = signal<SimplePokemon[]>([]);
  public currentPage = toSignal<number>(
    this._route.queryParamMap.pipe(
      map(params => params.get('page') ?? '1'),
      map(page => (isNaN(+page) ? 1 : +page)),
      map(page => Math.max(1, page)) // Ensure page is at least 1
    )
  )

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isLoading.set(false);
    // }, 5000);

    this.loadPokemons(0);
  }

  public loadPokemons(pageChange = 0): void {
    let pageToLoad = this.currentPage()! + pageChange;
    pageToLoad = Math.max(1, pageToLoad);

    this._pokemonService
      .loadPage(pageToLoad)
      .pipe(
          tap(() => this._router.navigate([], { queryParams: { page: pageToLoad }}) ),
          tap(() => this._title.setTitle(`Pokemon SRR - Page ${ pageToLoad }`))
        )
      .subscribe(pokemons => this.pokemons.set(pokemons));
  }
}
