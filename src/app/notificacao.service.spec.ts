import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

import { NotificacaoService } from './notificacao.service';

describe('NotificacaoService', () => {
  it('abre um snackbar com a mensagem', () => {
    const open = vi.fn();
    TestBed.configureTestingModule({
      providers: [{ provide: MatSnackBar, useValue: { open } }]
    });

    TestBed.inject(NotificacaoService).notificar('Olá');

    expect(open).toHaveBeenCalledWith('Olá', 'Ok', expect.objectContaining({ verticalPosition: 'top' }));
  });
});
