import { TestBed } from '@angular/core/testing';

import { produtos } from './produtos';
import { ProdutosService } from './produtos.service';

describe('ProdutosService', () => {
  let service: ProdutosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutosService);
  });

  it('retorna todos os produtos', () => {
    expect(service.getAll()).toHaveLength(produtos.length);
  });

  it('busca um produto pelo id', () => {
    expect(service.getOne(1)?.descricao).toBe('Mouse gamer');
    expect(service.getOne(999)).toBeUndefined();
  });

  it('filtra ignorando maiúsculas e acentos', () => {
    const resultado = service.buscar('MOUSE OTIMO');

    expect(resultado.map(produto => produto.descricao)).toEqual(['Mouse ótimo']);
  });

  it('retorna todos os produtos quando a busca está vazia', () => {
    expect(service.buscar('  ')).toHaveLength(produtos.length);
    expect(service.buscar(undefined)).toHaveLength(produtos.length);
  });
});
