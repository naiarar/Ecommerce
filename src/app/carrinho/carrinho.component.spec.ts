import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { CarrinhoService } from '../carrinho.service';
import { NotificacaoService } from '../notificacao.service';
import { produtos } from '../produtos';
import { CarrinhoComponent } from './carrinho.component';

describe('CarrinhoComponent', () => {
  let fixture: ComponentFixture<CarrinhoComponent>;
  let elemento: HTMLElement;
  let carrinhoService: CarrinhoService;

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [CarrinhoComponent],
      providers: [
        provideRouter([]),
        { provide: NotificacaoService, useValue: { notificar: vi.fn() } }
      ]
    }).compileComponents();

    carrinhoService = TestBed.inject(CarrinhoService);
    fixture = TestBed.createComponent(CarrinhoComponent);
    elemento = fixture.nativeElement;
  });

  it('informa quando o carrinho está vazio', async () => {
    await fixture.whenStable();

    expect(elemento.querySelector('.vazio')?.textContent).toContain('Seu carrinho está vazio');
  });

  it('lista os itens e o total', async () => {
    carrinhoService.adicionarAoCarrinho(produtos[11], 2);
    carrinhoService.adicionarAoCarrinho(produtos[13], 1);
    await fixture.whenStable();

    expect(elemento.querySelectorAll('li')).toHaveLength(2);
    expect(elemento.querySelector('.cart-total')?.textContent).toContain('90');
  });

  it('corrige a quantidade digitada para o limite do estoque', async () => {
    carrinhoService.adicionarAoCarrinho(produtos[0], 1);
    await fixture.whenStable();

    const campo = elemento.querySelector<HTMLInputElement>('input[type=number]')!;
    campo.value = '50';
    campo.dispatchEvent(new Event('change'));

    expect(campo.value).toBe('10');
    expect(carrinhoService.quantidadeNoCarrinho(produtos[0].id)).toBe(10);
  });

  it('finaliza a compra limpando o carrinho', async () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    carrinhoService.adicionarAoCarrinho(produtos[0], 1);
    await fixture.whenStable();

    fixture.componentInstance.comprar();

    expect(carrinhoService.itens()).toEqual([]);
    expect(navigate).toHaveBeenCalledWith(['/produtos']);
  });
});
