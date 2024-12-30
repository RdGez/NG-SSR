import { TestBed } from "@angular/core/testing"
import { PokemonsService } from "./pokemons.service"
import { provideHttpClient } from "@angular/common/http"
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing"
import { PokeAPIResponse, SimplePokemon } from "../Interfaces"
import { catchError } from "rxjs"

const expectedPokemons: SimplePokemon[] = [
  { id: '1', name: 'bulbasaur' },
  { id: '2', name: 'ivysaur' },
];

const mockPokeApiResponse: PokeAPIResponse = {
  count: 1302,
  next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
  previous: '',
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
  ],
}

const mockPokemon = {
  id: '1',
  name: 'bulbasaur',
}

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    })
    service = TestBed.inject(PokemonsService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should load a page of SimplePokemon', () => {
    service.loadPage(1).subscribe(pokemons => {
      expect(pokemons).toEqual(expectedPokemons)
    })

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')

    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');

    req.flush(mockPokeApiResponse);
  })

  it('should load a page 5 of SimplePokemon', () => {
    service.loadPage(5).subscribe(pokemons => {
      expect(pokemons).toEqual(expectedPokemons)
    })

    const req = httpMock.expectOne('https://pokeapi.co/api/v2/pokemon?offset=80&limit=20')

    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe('https://pokeapi.co/api/v2/pokemon?offset=80&limit=20');

    req.flush(mockPokeApiResponse);
  })

  it('should load a pokemon by ID', () => {
    const pokemonId = '1'
    service.loadPokemon(pokemonId).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon)
    })

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)

    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);

    req.flush(mockPokemon);
  })

  it('should load a pokemon by name', () => {
    const pokemonName = 'bulbasaur'
    service.loadPokemon(pokemonName).subscribe((pokemon: any) => {
      expect(pokemon).toEqual(mockPokemon)
    })

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    req.flush(mockPokemon);
  })

  it('should catch error if pokemon not found', () => {
    const pokemonName = 'unknown'
    service.loadPokemon(pokemonName)
      .pipe(
        catchError((error) => {
          expect(error).toEqual(new Error('Pokemon not found'));
          return [];
        })
      ).subscribe();

    const req = httpMock.expectOne(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)

    expect(req.request.method).toBe('GET');
    expect(req.request.url).toBe(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    req.flush('Pokemon not found', { status: 404, statusText: 'Not Found' });
  })
})
