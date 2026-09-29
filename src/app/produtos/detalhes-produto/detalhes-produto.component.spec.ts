import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { CarrinhoService } from '../../carrinho.service';
import { NotificacaoService } from '../../notificacao.service';
import { DetalhesProdutoComponent } from './detalhes-produto.component';

describe('DetalhesProdutoComponent', () => {
  let fixture: ComponentFixture<DetalhesProdutoComponent>;
  let elemento: HTMLElement;
  let notificar: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    localStorage.clear();
    notificar = vi.fn();

    await TestBed.configureTestingModule({
      imports: [DetalhesProdutoComponent],
      providers: [
        provideRouter([]),
        { provide: NotificacaoService, useValue: { notificar } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetalhesProdutoComponent);
    elemento = fixture.nativeElement;
  });

  it('exibe os dados do produto', async () => {
    fixture.componentRef.setInput('id', '1');
    await fixture.whenStable();

    expect(elemento.querySelector('.product__name')?.textContent).toContain('Mouse gamer');
  });

  it('exibe mensagem para produto inexistente', async () => {
    fixture.componentRef.setInput('id', '999');
    await fixture.whenStable();

    expect(elemento.querySelector('.product__not-found')).toBeTruthy();
  });

  it('adiciona a quantidade escolhida ao carrinho', async () => {
    fixture.componentRef.setInput('id', '1');
    await fixture.whenStable();

    fixture.componentInstance.quantidade.set(3);
    fixture.componentInstance.adicionarAoCarrinho();

    expect(TestBed.inject(CarrinhoService).quantidadeNoCarrinho(1)).toBe(3);
    expect(fixture.componentInstance.disponivel()).toBe(7);
    expect(notificar).toHaveBeenCalledWith('O produto foi adicionado ao carrinho.');
  });

  it('não adiciona acima do estoque', async () => {
    fixture.componentRef.setInput('id', '1');
    await fixture.whenStable();

    fixture.componentInstance.quantidade.set(11);
    fixture.componentInstance.adicionarAoCarrinho();

    expect(TestBed.inject(CarrinhoService).quantidadeNoCarrinho(1)).toBe(0);
    expect(notificar).toHaveBeenCalledWith('Informe uma quantidade entre 1 e 10.');
  });
});
