import { TestBed } from '@angular/core/testing';

import { AssistentGuard } from './assistent.guard';

describe('AssistentGuard', () => {
  let guard: AssistentGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AssistentGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
