import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input, linkedSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { CarrinhoService } from '../../carrinho.service';
import { NotificacaoService } from '../../notificacao.service';
import { ProdutosService } from '../../produtos.service';

@Component({
  selector: 'app-detalhes-produto',
  imports: [CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent {
  private readonly produtosService = inject(ProdutosService);
  private readonly notificacaoService = inject(NotificacaoService);
  private readonly carrinhoService = inject(CarrinhoService);

  readonly id = input.required<string>();
  readonly produto = computed(() => this.produtosService.getOne(Number(this.id())));
  readonly disponivel = computed(() => {
    const produto = this.produto();
    return produto ? this.carrinhoService.disponivelParaAdicionar(produto) : 0;
  });
  readonly quantidade = linkedSignal(() => Math.min(1, this.disponivel()));

  adicionarAoCarrinho() {
    const produto = this.produto();

    if (!produto) {
      return;
    }

    if (!this.carrinhoService.adicionarAoCarrinho(produto, this.quantidade())) {
      this.notificacaoService.notificar(`Informe uma quantidade entre 1 e ${this.disponivel()}.`);
      return;
    }

    this.notificacaoService.notificar('O produto foi adicionado ao carrinho.');
  }
}
