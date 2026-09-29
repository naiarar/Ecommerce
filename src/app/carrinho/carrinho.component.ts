import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { CarrinhoService } from '../carrinho.service';
import { NotificacaoService } from '../notificacao.service';

@Component({
  selector: 'app-carrinho',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent {
  private readonly router = inject(Router);
  private readonly notificacaoService = inject(NotificacaoService);
  readonly carrinhoService = inject(CarrinhoService);

  alterarQuantidade(produtoId: number, campo: HTMLInputElement) {
    const quantidade = this.carrinhoService.atualizarQuantidade(produtoId, campo.valueAsNumber);
    campo.value = String(quantidade);
  }

  removeProdutoCarrinho(produtoId: number) {
    this.carrinhoService.removerProdutoCarrinho(produtoId);
  }

  comprar() {
    this.carrinhoService.limparCarrinho();
    this.notificacaoService.notificar('Parabéns! Você adquiriu os melhores produtos de informática!');
    this.router.navigate(['/produtos']);
  }
}
