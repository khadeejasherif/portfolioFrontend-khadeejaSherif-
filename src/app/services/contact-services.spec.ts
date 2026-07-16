import { TestBed } from '@angular/core/testing';

import { ContactServices } from './contact-services';

describe('ContactServices', () => {
  let service: ContactServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
