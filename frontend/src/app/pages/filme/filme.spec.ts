import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Filme } from './filme';

describe('Filme', () => {
  let component: Filme;
  let fixture: ComponentFixture<Filme>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Filme],
    }).compileComponents();

    fixture = TestBed.createComponent(Filme);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
