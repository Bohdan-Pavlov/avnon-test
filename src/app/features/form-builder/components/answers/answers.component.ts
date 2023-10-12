import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { Answer, Question } from 'src/app/features/form-builder/interfaces/question.interface';
import { QuestionService } from 'src/app/features/form-builder/services/question.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.scss']
})
export class AnswersComponent implements OnInit {
  public questions$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
  public answers$: BehaviorSubject<Answer[]> = new BehaviorSubject<Answer[]>([]);

  public backButtonText = 'Go back to builder';

  constructor(private questionService: QuestionService, private router: Router) { }

  ngOnInit(): void {
    this.questions$ = this.questionService.getQuestions$();
    this.answers$ = this.questionService.getAnswers$();
  }

  public getAnswer(index: number): string {
    const answer = this.answers$.getValue()[index];

    if (answer.answer && typeof answer.answer === 'string') {
      return answer.answer;
    }

    const checkboxAnswers = answer.answer as boolean[];

    const selectedAnswers = this.questions$.value[index].answerOptions?.filter((answer, index) => checkboxAnswers[index]);

    return selectedAnswers?.join(', ') ?? '';
  }

  public goBack(): void {
    this.router.navigate(['/form']);
  }
}
