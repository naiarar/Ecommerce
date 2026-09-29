import { TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  it('exibe o ano atual no copyright', async () => {
    await TestBed.configureTestingModule({ imports: [FooterComponent] }).compileComponents();
    const fixture = TestBed.createComponent(FooterComponent);
    await fixture.whenStable();

    const copyright = (fixture.nativeElement as HTMLElement).querySelector('.footer__copyright');
    expect(copyright?.textContent).toContain(String(new Date().getFullYear()));
  });
});
