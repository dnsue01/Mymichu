import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEntrenadoresComponent } from './crear-entrenadores.component';

describe('CrearEntrenadoresComponent', () => {
  let component: CrearEntrenadoresComponent;
  let fixture: ComponentFixture<CrearEntrenadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearEntrenadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearEntrenadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
