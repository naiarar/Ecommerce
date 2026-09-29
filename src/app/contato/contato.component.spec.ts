import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacaoService } from '../notificacao.service';
import { ContatoComponent } from './contato.component';

describe('ContatoComponent', () => {
  let fixture: ComponentFixture<ContatoComponent>;
  let component: ContatoComponent;
  let notificar: ReturnType<typeof vi.fn>;

  beforeEach(async () => {
    notificar = vi.fn();

    await TestBed.configureTestingModule({
      imports: [ContatoComponent],
      providers: [{ provide: NotificacaoService, useValue: { notificar } }]
    }).compileComponents();

    fixture = TestBed.createComponent(ContatoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('começa com o formulário inválido e o botão desabilitado', () => {
    const botao = (fixture.nativeElement as HTMLElement).querySelector<HTMLButtonElement>('button[type=submit]');

    expect(component.formContato.invalid).toBe(true);
    expect(botao?.disabled).toBe(true);
  });

  it('envia e limpa o formulário quando os dados são válidos', () => {
    component.formContato.setValue({
      nome: 'Maria Silva',
      assunto: 'Dúvida sobre entrega',
      telefone: '47999999999',
      email: 'maria@email.com',
      mensagem: 'Gostaria de saber o prazo de entrega.'
    });

    component.enviarFormulario();

    expect(notificar).toHaveBeenCalledWith('Mensagem enviada com sucesso!');
    expect(component.formContato.getRawValue().nome).toBe('');
  });

  it('não envia um formulário inválido', () => {
    component.enviarFormulario();

    expect(notificar).not.toHaveBeenCalled();
    expect(component.exibirErro('nome')).toBe(true);
  });
});
