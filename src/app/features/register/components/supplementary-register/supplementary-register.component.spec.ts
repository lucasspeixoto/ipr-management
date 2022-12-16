import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplementaryRegisterComponent } from './supplementary-register.component';

describe('SupplementaryRegisterComponent', () => {
  let component: SupplementaryRegisterComponent;
  let fixture: ComponentFixture<SupplementaryRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SupplementaryRegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SupplementaryRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
