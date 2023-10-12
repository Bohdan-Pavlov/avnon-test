import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Question } from 'src/app/features/form-builder/interfaces/question.interface';
import { QuestionService } from 'src/app/features/form-builder/services/question.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  public isAddQuestionModalOpened: boolean = false;
  public isInitialised: boolean = false;
  public questions: Question[] = [];

  public addNewQuestionButtonText = 'Add new question';
  public reviewAnswersButtonText = 'Review My Answers';

  public questionsForm: FormGroup = this.fb.group({
    answers: this.fb.array([]),
  });

  constructor(private questionService: QuestionService, private fb: FormBuilder, private router: Router) {}

  public ngOnInit(): void {
    this.questionService.getQuestions$().subscribe((questions: Question[]) => {
      this.questions = questions;

      if (this.isInitialised) {
        const lastQuestion = questions[questions.length - 1];
        this.addFormGroup(lastQuestion);
        return;
      }

      questions.forEach((question: Question) => {
        this.addFormGroup(question);
      })

      this.isInitialised = true;
    })
  }

  public get answers(): FormArray {
    return this.questionsForm.get('answers') as FormArray;
  }

  public addFormGroup(question: Question): void {
    if (question.questionType === 'checkbox') {
      this.answers.push(this.fb.group({
        answer: this.fb.array(this.createAnswersArray(question.answerOptions ?? [])),
      }));
      return;
    }

    this.answers.push(this.fb.group({
      answer: [''],
    }))
  }

  private createAnswersArray(answers: string[]): FormControl[] {
    return answers.map(() => {
      return this.fb.control(false);
    });
  }

  public showAnswers(): void {
    const answers = this.answers.value;
    this.questionService.addAnswers(answers);
    this.router.navigate(['form/answers']);
  }

  public openAddQuestionModal(): void {
    this.isAddQuestionModalOpened = true;
  }

  public closeAddQuestionModal(): void {
    this.isAddQuestionModalOpened = false;
  }
}
