import { TestBed, inject } from '@angular/core/testing';

import { BasicAuthHtppInterceptorService } from './auth-http-interceptor.service';

describe('BasicAuthHtppInterceptorServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicAuthHtppInterceptorService]
    });
  });

  it('should be created', inject([BasicAuthHtppInterceptorService], (service: BasicAuthHtppInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
