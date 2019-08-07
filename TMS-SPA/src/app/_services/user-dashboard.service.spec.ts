/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UserDashboardService } from './user-dashboard.service';

describe('Service: UserDashboard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserDashboardService]
    });
  });

  it('should ...', inject([UserDashboardService], (service: UserDashboardService) => {
    expect(service).toBeTruthy();
  }));
});
