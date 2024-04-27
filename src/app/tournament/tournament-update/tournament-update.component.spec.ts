import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentUpdateComponent } from './tournament-update.component';

describe('TournamentUpdateComponent', () => {
  let component: TournamentUpdateComponent;
  let fixture: ComponentFixture<TournamentUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournamentUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TournamentUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
