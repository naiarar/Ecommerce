import { Injectable } from '@angular/core';
import { IProduto, produtos } from './produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  private readonly produtos: readonly IProduto[] = produtos;

  getAll(): readonly IProduto[] {
    return this.produtos;
  }

  getOne(produtoId: number): IProduto | undefined {
    return this.produtos.find(produto => produto.id === produtoId);
  }

  buscar(termo?: string | null): readonly IProduto[] {
    const termoNormalizado = normalizar(termo ?? '');

    if (!termoNormalizado) {
      return this.produtos;
    }

    return this.produtos.filter(produto => normalizar(produto.descricao).includes(termoNormalizado));
  }
}

function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}
