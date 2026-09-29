import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { CarrinhoService } from '../carrinho.service';
import { produtos } from '../produtos';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    await fixture.whenStable();
  });

  it('mostra a quantidade de itens do carrinho', async () => {
    TestBed.inject(CarrinhoService).adicionarAoCarrinho(produtos[0], 2);
    await fixture.whenStable();

    const badge = (fixture.nativeElement as HTMLElement).querySelector('.badge-carrinho');
    expect(badge?.textContent?.trim()).toBe('2');
  });

  it('navega para a listagem com o termo buscado', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    fixture.componentInstance.buscar('  mouse  ');

    expect(navigate).toHaveBeenCalledWith(['/produtos'], { queryParams: { descricao: 'mouse' } });
  });

  it('remove o filtro quando a busca está vazia', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    fixture.componentInstance.buscar('   ');

    expect(navigate).toHaveBeenCalledWith(['/produtos'], { queryParams: { descricao: null } });
  });
});
