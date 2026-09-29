import { Injectable, computed, signal } from '@angular/core';
import { IProduto, IProdutoCarrinho } from './produtos';

const CHAVE_CARRINHO = 'carrinho';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  private readonly _itens = signal<IProdutoCarrinho[]>(lerCarrinhoSalvo());

  readonly itens = this._itens.asReadonly();
  readonly quantidadeItens = computed(() => this._itens().reduce((soma, item) => soma + item.quantidade, 0));
  readonly total = computed(() => this._itens().reduce((soma, item) => soma + item.preco * item.quantidade, 0));

  quantidadeNoCarrinho(produtoId: number): number {
    return this._itens().find(item => item.id === produtoId)?.quantidade ?? 0;
  }

  disponivelParaAdicionar(produto: IProduto): number {
    return Math.max(produto.quantidadeEstoque - this.quantidadeNoCarrinho(produto.id), 0);
  }

  adicionarAoCarrinho(produto: IProduto, quantidade: number): boolean {
    if (!Number.isInteger(quantidade) || quantidade < 1 || quantidade > this.disponivelParaAdicionar(produto)) {
      return false;
    }

    const existente = this._itens().find(item => item.id === produto.id);

    if (existente) {
      this.atualizarQuantidade(produto.id, existente.quantidade + quantidade);
    } else {
      this.salvar([...this._itens(), { ...produto, quantidade }]);
    }

    return true;
  }

  atualizarQuantidade(produtoId: number, quantidade: number): number {
    let quantidadeFinal = 0;

    this.salvar(this._itens().map(item => {
      if (item.id !== produtoId) {
        return item;
      }

      quantidadeFinal = limitar(quantidade, 1, item.quantidadeEstoque);
      return { ...item, quantidade: quantidadeFinal };
    }));

    return quantidadeFinal;
  }

  removerProdutoCarrinho(produtoId: number): void {
    this.salvar(this._itens().filter(item => item.id !== produtoId));
  }

  limparCarrinho(): void {
    this._itens.set([]);
    localStorage.removeItem(CHAVE_CARRINHO);
  }

  private salvar(itens: IProdutoCarrinho[]): void {
    this._itens.set(itens);
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
  }
}

function limitar(valor: number, minimo: number, maximo: number): number {
  if (!Number.isFinite(valor)) {
    return minimo;
  }

  return Math.min(Math.max(Math.trunc(valor), minimo), maximo);
}

function lerCarrinhoSalvo(): IProdutoCarrinho[] {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE_CARRINHO) ?? '[]');
    return Array.isArray(salvo) ? salvo : [];
  } catch {
    return [];
  }
}
