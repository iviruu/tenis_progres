import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChardsComponent } from './chards.component';

describe('ChardsComponent', () => {
  let component: ChardsComponent;
  let fixture: ComponentFixture<ChardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
