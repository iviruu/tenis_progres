import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerPerfilModalComponent } from './ver-perfil-modal.component';

describe('VerPerfilModalComponent', () => {
  let component: VerPerfilModalComponent;
  let fixture: ComponentFixture<VerPerfilModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerPerfilModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerPerfilModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
