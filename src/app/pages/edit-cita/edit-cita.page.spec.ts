import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCitaPage } from './edit-cita.page';

describe('EditCitaPage', () => {
  let component: EditCitaPage;
  let fixture: ComponentFixture<EditCitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
