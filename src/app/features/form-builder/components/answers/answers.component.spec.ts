import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswersComponent } from 'src/app/features/form-builder/components/answers/answers.component';

describe('AnswersComponent', () => {
  let component: AnswersComponent;
  let fixture: ComponentFixture<AnswersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnswersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnswersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
