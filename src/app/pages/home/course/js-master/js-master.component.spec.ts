import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsMasterComponent } from './js-master.component';

describe('JsMasterComponent', () => {
  let component: JsMasterComponent;
  let fixture: ComponentFixture<JsMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
