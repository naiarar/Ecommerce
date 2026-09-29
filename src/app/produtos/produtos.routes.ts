import { Routes } from '@angular/router';

import { DetalhesProdutoComponent } from './detalhes-produto/detalhes-produto.component';
import { ProdutosComponent } from './produtos.component';

export const produtosRoutes: Routes = [
  { path: '', title: 'Produtos | Ecommerce', component: ProdutosComponent },
  { path: ':id', title: 'Detalhes do produto | Ecommerce', component: DetalhesProdutoComponent }
];
