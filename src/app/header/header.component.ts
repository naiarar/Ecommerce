import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { CarrinhoService } from '../carrinho.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private readonly router = inject(Router);
  readonly carrinhoService = inject(CarrinhoService);

  buscar(termo: string) {
    const descricao = termo.trim();
    this.router.navigate(['/produtos'], { queryParams: { descricao: descricao || null } });
  }
}
