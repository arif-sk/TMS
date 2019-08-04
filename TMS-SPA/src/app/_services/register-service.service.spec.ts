/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegisterServiceService } from './register-service.service';

describe('Service: RegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterServiceService]
    });
  });

  it('should ...', inject([RegisterServiceService], (service: RegisterServiceService) => {
    expect(service).toBeTruthy();
  }));
});
