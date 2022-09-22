import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelefactureComponent } from './modelefacture.component';

describe('ModelefactureComponent', () => {
  let component: ModelefactureComponent;
  let fixture: ComponentFixture<ModelefactureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelefactureComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelefactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
