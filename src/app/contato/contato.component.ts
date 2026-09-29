import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

import { NotificacaoService } from '../notificacao.service';

@Component({
  selector: 'app-contato',
  imports: [ReactiveFormsModule, NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent {
  private readonly fb = inject(FormBuilder);
  private readonly notificacaoService = inject(NotificacaoService);

  readonly formContato = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(4)]],
    assunto: ['', [Validators.required, Validators.minLength(10)]],
    telefone: ['', [Validators.required, Validators.minLength(11)]],
    email: ['', [Validators.required, Validators.email]],
    mensagem: ['', [Validators.required, Validators.minLength(20)]]
  });

  exibirErro(campo: keyof ContatoComponent['formContato']['controls']): boolean {
    const controle = this.formContato.controls[campo];
    return controle.invalid && (controle.touched || controle.dirty);
  }

  enviarFormulario() {
    if (this.formContato.invalid) {
      this.formContato.markAllAsTouched();
      return;
    }

    this.notificacaoService.notificar('Mensagem enviada com sucesso!');
    this.formContato.reset();
  }
}
