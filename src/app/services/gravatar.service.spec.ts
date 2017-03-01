import { TestBed, inject } from '@angular/core/testing';
import { GravatarService } from './gravatar.service';

describe('GravatarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GravatarService]
    });
  });

  it('should ...', inject([GravatarService], (service: GravatarService) => {
    expect(service).toBeTruthy();
  }));
});
