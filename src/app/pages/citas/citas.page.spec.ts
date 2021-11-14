import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasPage } from './citas.page';

describe('CitasPage', () => {
  let component: CitasPage;
  let fixture: ComponentFixture<CitasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
