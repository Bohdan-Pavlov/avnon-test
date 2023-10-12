import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Answer, Question } from 'src/app/features/form-builder/interfaces/question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private questions$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
  private answers$: BehaviorSubject<Answer[]> = new BehaviorSubject<Answer[]>([]);

  public getQuestions$(): BehaviorSubject<Question[]> {
    return this.questions$;
  }

  public getAnswers$(): BehaviorSubject<Answer[]> {
    return this.answers$;
  }

  public addQuestion(question: Question): void {
    this.questions$.next([...this.questions$.value, question]);
  }

  public addAnswers(answers: Answer[]): void {
    this.answers$.next(answers);
  }
}
