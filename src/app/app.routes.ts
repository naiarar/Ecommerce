import { Routes } from '@angular/router';

import { NaoEncontradaComponent } from './nao-encontrada/nao-encontrada.component';

export const routes: Routes = [
  { path: '', redirectTo: 'produtos', pathMatch: 'full' },
  { path: 'produtos', loadChildren: () => import('./produtos/produtos.routes').then(m => m.produtosRoutes) },
  { path: 'carrinho', title: 'Carrinho | Ecommerce', loadComponent: () => import('./carrinho/carrinho.component').then(m => m.CarrinhoComponent) },
  { path: 'contato', title: 'Contato | Ecommerce', loadComponent: () => import('./contato/contato.component').then(m => m.ContatoComponent) },
  { path: '**', title: 'Página não encontrada | Ecommerce', component: NaoEncontradaComponent }
];
