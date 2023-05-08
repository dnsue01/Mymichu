import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarMarcasComponent } from './gestionar-marcas.component';

describe('GestionarMarcasComponent', () => {
  let component: GestionarMarcasComponent;
  let fixture: ComponentFixture<GestionarMarcasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarMarcasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarMarcasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
