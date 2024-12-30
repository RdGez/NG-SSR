import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonCardComponent } from './pokemon-card.component';
import { provideRouter } from '@angular/router';
import { SimplePokemon } from '../../Interfaces';

const mockPokemon: SimplePokemon = {
  id: "1",
  name: 'bulbasaur',
}

describe('PokemonCardComponent', () => {
  let fixture: ComponentFixture<PokemonCardComponent>;
  let component: PokemonCardComponent;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonCardComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(PokemonCardComponent);
    fixture.componentRef.setInput('pokemon', mockPokemon);

    compiled = fixture.nativeElement as HTMLElement
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the SimplePokemon signal inputValue', () => {
    expect(component.pokemon()).toEqual(mockPokemon)
  })

  it('should render the pokemon name and image correctly', () => {
    const img = compiled.querySelector('img') as HTMLImageElement
    const name = compiled.querySelector('h2') as HTMLHeadingElement

    expect(img.src).toContain(mockPokemon.id)
    expect(name.textContent).toContain(mockPokemon.name)
  })

  it('should have the proper ng-reflect-router-link', () => {
    const divWithLink = compiled.querySelector('div') as HTMLDivElement
    expect(divWithLink?.attributes.getNamedItem('ng-reflect-router-link')?.value).toBe(`/pokemons,${mockPokemon.name}`)
  })
});
