import { TestBed } from '@angular/core/testing';

import { CarrinhoService } from './carrinho.service';
import { IProduto } from './produtos';

const mouse: IProduto = {
  id: 1,
  descricao: 'Mouse gamer',
  preco: 100,
  descricaoPreco: 'À vista no PIX',
  quantidadeEstoque: 5,
  imagem: './assets/mouse-3.jpg'
};

const teclado: IProduto = { ...mouse, id: 2, descricao: 'Teclado', preco: 50 };

describe('CarrinhoService', () => {
  let service: CarrinhoService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrinhoService);
  });

  it('começa vazio quando não há nada salvo', () => {
    expect(service.itens()).toEqual([]);
    expect(service.total()).toBe(0);
  });

  it('adiciona produtos, calcula totais e persiste no localStorage', () => {
    service.adicionarAoCarrinho(mouse, 2);
    service.adicionarAoCarrinho(teclado, 1);

    expect(service.quantidadeItens()).toBe(3);
    expect(service.total()).toBe(250);
    expect(JSON.parse(localStorage.getItem('carrinho')!)).toHaveLength(2);
  });

  it('soma a quantidade quando o mesmo produto é adicionado novamente', () => {
    service.adicionarAoCarrinho(mouse, 2);
    service.adicionarAoCarrinho(mouse, 1);

    expect(service.itens()).toHaveLength(1);
    expect(service.quantidadeNoCarrinho(mouse.id)).toBe(3);
  });

  it('não permite ultrapassar o estoque disponível', () => {
    expect(service.adicionarAoCarrinho(mouse, 4)).toBe(true);
    expect(service.adicionarAoCarrinho(mouse, 2)).toBe(false);
    expect(service.disponivelParaAdicionar(mouse)).toBe(1);
  });

  it('rejeita quantidades inválidas', () => {
    expect(service.adicionarAoCarrinho(mouse, 0)).toBe(false);
    expect(service.adicionarAoCarrinho(mouse, 1.5)).toBe(false);
    expect(service.itens()).toEqual([]);
  });

  it('limita a quantidade atualizada entre 1 e o estoque', () => {
    service.adicionarAoCarrinho(mouse, 1);

    expect(service.atualizarQuantidade(mouse.id, 99)).toBe(5);
    expect(service.atualizarQuantidade(mouse.id, 0)).toBe(1);
    expect(service.atualizarQuantidade(mouse.id, NaN)).toBe(1);
  });

  it('remove um produto do carrinho', () => {
    service.adicionarAoCarrinho(mouse, 1);
    service.adicionarAoCarrinho(teclado, 1);

    service.removerProdutoCarrinho(mouse.id);

    expect(service.itens().map(item => item.id)).toEqual([teclado.id]);
  });

  it('limpa apenas a chave do carrinho no localStorage', () => {
    localStorage.setItem('outra-chave', 'valor');
    service.adicionarAoCarrinho(mouse, 1);

    service.limparCarrinho();

    expect(service.itens()).toEqual([]);
    expect(localStorage.getItem('carrinho')).toBeNull();
    expect(localStorage.getItem('outra-chave')).toBe('valor');
  });

  it('ignora dados corrompidos no localStorage', () => {
    localStorage.setItem('carrinho', '{invalido');
    TestBed.resetTestingModule();

    expect(TestBed.inject(CarrinhoService).itens()).toEqual([]);
  });
});
