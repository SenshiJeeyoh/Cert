import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCertComponent } from './issue-cert.component';

describe('IssueCertComponent', () => {
  let component: IssueCertComponent;
  let fixture: ComponentFixture<IssueCertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueCertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueCertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
