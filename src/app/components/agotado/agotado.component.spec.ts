import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgotadoComponent } from './agotado.component';

describe('AgotadoComponent', () => {
  let component: AgotadoComponent;
  let fixture: ComponentFixture<AgotadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgotadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgotadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
