import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcclesiasticalRegisterComponent } from './ecclesiastical-register.component';

describe('EcclesiasticalRegisterComponent', () => {
  let component: EcclesiasticalRegisterComponent;
  let fixture: ComponentFixture<EcclesiasticalRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EcclesiasticalRegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EcclesiasticalRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
