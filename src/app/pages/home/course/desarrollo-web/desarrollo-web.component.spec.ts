import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesarrolloWebComponent } from './desarrollo-web.component';

describe('DesarrolloWebComponent', () => {
  let component: DesarrolloWebComponent;
  let fixture: ComponentFixture<DesarrolloWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesarrolloWebComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesarrolloWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
