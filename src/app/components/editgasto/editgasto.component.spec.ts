import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditgastoComponent } from './editgasto.component';

describe('EditgastoComponent', () => {
  let component: EditgastoComponent;
  let fixture: ComponentFixture<EditgastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditgastoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditgastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
