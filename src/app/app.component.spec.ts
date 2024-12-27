import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
    selector: 'navbar',
    standalone: true,
})
class NavbarComponentMock {}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let compile: HTMLDivElement;
  let app: AppComponent;

  beforeEach(async () => {
    // One way to work with Mocks:
    // TestBed.overrideComponent(AppComponent, {
    //   set: {
    //     imports: [NavbarComponentMock],
    //     schemas: [ CUSTOM_ELEMENTS_SCHEMA]
    //   }
    // })

    // Recomented way to work with Mocks:
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])]
    }).overrideComponent(AppComponent, {
      add: {
        imports: [NavbarComponentMock]
      },
      remove: {
        imports: [NavbarComponent]
      }
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compile = fixture.nativeElement;
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it(`should render the navbar and router-outlet`, () => {
    expect(compile.querySelector('navbar')).toBeTruthy();
    expect(compile.querySelector('router-outlet')).toBeTruthy();
  });
});
