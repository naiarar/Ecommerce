import { CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-produtos',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {
  private readonly produtosService = inject(ProdutosService);

  readonly descricao = input<string>();
  readonly produtos = computed(() => this.produtosService.buscar(this.descricao()));
}
