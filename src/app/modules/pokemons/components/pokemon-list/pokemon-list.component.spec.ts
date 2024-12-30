import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonListComponent } from './pokemon-list.component';
import { SimplePokemon } from '../../Interfaces';
import { provideRouter } from '@angular/router';

const mockPokemons: SimplePokemon[] = [
  {
    id: "1",
    name: 'bulbasaur',
  },
  {
    id: "2",
    name: 'ivysaur',
  },
  {
    id: "3",
    name: 'venusaur',
  }
]

describe('PokemonListComponent', () => {
  let fixture: ComponentFixture<PokemonListComponent>;
  let component: PokemonListComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonListComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonListComponent);
    fixture.componentRef.setInput('pokemons', mockPokemons);

    compiled = fixture.nativeElement as HTMLElement
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render the list of pokemons', () => {
    const pokemonList = compiled.querySelector('.pokemon-list');

    expect(compiled.querySelectorAll('pokemon-card').length).toBe(mockPokemons.length);
  })
});
