import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { produtos } from '../produtos';
import { ProdutosComponent } from './produtos.component';

describe('ProdutosComponent', () => {
  let fixture: ComponentFixture<ProdutosComponent>;
  let elemento: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutosComponent);
    elemento = fixture.nativeElement;
  });

  it('lista todos os produtos', async () => {
    await fixture.whenStable();

    expect(elemento.querySelectorAll('.product-list__card')).toHaveLength(produtos.length);
  });

  it('filtra pela descrição recebida na query string', async () => {
    fixture.componentRef.setInput('descricao', 'teclado');
    await fixture.whenStable();

    expect(elemento.querySelectorAll('.product-list__card')).toHaveLength(2);
    expect(elemento.querySelector('.search-result')?.textContent).toContain('2 resultado(s)');
  });

  it('informa quando nenhum produto é encontrado', async () => {
    fixture.componentRef.setInput('descricao', 'geladeira');
    await fixture.whenStable();

    expect(elemento.querySelector('.empty')?.textContent).toContain('Nenhum produto encontrado');
  });
});
