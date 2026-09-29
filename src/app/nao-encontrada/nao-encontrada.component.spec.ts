import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { NaoEncontradaComponent } from './nao-encontrada.component';

describe('NaoEncontradaComponent', () => {
  it('exibe a mensagem de página não encontrada', async () => {
    await TestBed.configureTestingModule({
      imports: [NaoEncontradaComponent],
      providers: [provideRouter([])]
    }).compileComponents();
    const fixture = TestBed.createComponent(NaoEncontradaComponent);
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Página não encontrada');
  });
});
