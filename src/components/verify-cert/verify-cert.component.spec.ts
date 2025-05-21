import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCertComponent } from './verify-cert.component';

describe('VerifyCertComponent', () => {
  let component: VerifyCertComponent;
  let fixture: ComponentFixture<VerifyCertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyCertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyCertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
