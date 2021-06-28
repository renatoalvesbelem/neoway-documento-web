import { TestBed } from '@angular/core/testing';

import { DocumentoDataService } from './documento-data.service';

describe('DocumentoDataService', () => {
  let service: DocumentoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
