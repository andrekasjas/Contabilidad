import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgastoComponent } from './addgasto.component';

describe('AddgastoComponent', () => {
  let component: AddgastoComponent;
  let fixture: ComponentFixture<AddgastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddgastoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddgastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
