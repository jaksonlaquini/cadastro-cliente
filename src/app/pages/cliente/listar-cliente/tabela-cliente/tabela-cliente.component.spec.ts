import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaClienteComponent } from './tabela-cliente.component';

describe('TabelaClienteComponent', () => {
  let component: TabelaClienteComponent;
  let fixture: ComponentFixture<TabelaClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabelaClienteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TabelaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
