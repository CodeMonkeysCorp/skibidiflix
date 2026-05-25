import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionMap } from './session-map';

describe('SessionMap', () => {
  let component: SessionMap;
  let fixture: ComponentFixture<SessionMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionMap],
    }).compileComponents();

    fixture = TestBed.createComponent(SessionMap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
