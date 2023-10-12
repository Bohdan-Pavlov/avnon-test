import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionService } from 'src/app/features/form-builder/services/question.service';
import { Checkbox, QuestionType } from 'src/app/features/form-builder/components/add-question-modal/add-question.types';

@Component({
	selector: 'app-add-question-modal',
	templateUrl: './add-question-modal.component.html',
	styleUrls: ['./add-question-modal.component.scss'],
})
export class AddQuestionModalComponent implements OnInit {
	@Output() modalClosed = new EventEmitter<void>();


	public title = 'Add a New Question';
	public questionFieldPlaceholder = 'Type question here';
	public addAnswerOptionFieldPlaceholder = 'Add Answer Option';
	public addAnswerButtonText = '+ Add another answer';
	public submitButtonText = 'Submit';

	public addQuestionForm: FormGroup = new FormGroup({});
	public questionTypes: QuestionType[] = [];
	public checkboxes: Checkbox[] = [];

	@HostListener('click', ['$event'])
	public onClick(event: Event): void {
		this.closeModal(event);
	}

	constructor(private fb: FormBuilder, private questionService: QuestionService) {}

	public ngOnInit(): void {
		this.initializeForm();
		this.initializeValues();

		this.questionType.valueChanges.subscribe((value): void => {
			if (value === 'paragraph') {
				this.removeControlsForParagraphQuestionType();
				this.toggleCheckboxVisibility(0);
				return;
			}

			this.addControlsForParagraphQuestionType();
			this.toggleCheckboxVisibility(0);
		})
	}

	private initializeForm(): void {
		this.addQuestionForm = this.fb.group({
			questionType: ['checkbox', Validators.required],
			question: ['', Validators.required],
			answerOptions: this.fb.array([this.createAnswerControl()]),
			allowOwnAnswer: [false],
			required: [false],
		});
	}

	private initializeValues(): void {
		this.questionTypes = [
			{
				value: 'checkbox',
				viewValue: 'Checkbox List',
			},
			{
				value: 'paragraph',
				viewValue: 'Paragraph',
			},
		];

		this.checkboxes = [
			{
				isVisible: this.questionType.value === 'checkbox',
				formControlName: 'allowOwnAnswer',
				label: 'Allow user to specify their own answer',
			},
			{
				isVisible: true,
				formControlName: 'required',
				label: 'This field is required',
			}
		];
	}

	public get questionType(): FormControl {
		return this.addQuestionForm.get('questionType') as FormControl;
	}

	public get answerOptions(): FormArray {
		return this.addQuestionForm.get('answerOptions') as FormArray;
	}

	public addAnswerOption(): void {
		this.answerOptions.push(this.createAnswerControl());
	}

	public createAnswerControl(): FormControl {
		return this.fb.control('', Validators.required);
	}

	private toggleCheckboxVisibility(index: number): void {
		this.checkboxes[index].isVisible = !this.checkboxes[index].isVisible;
	}

	private addControlsForParagraphQuestionType(): void {
		this.addQuestionForm.addControl('answerOptions', this.fb.array([this.createAnswerControl()]));
		this.addQuestionForm.addControl('allowOwnAnswer', this.fb.control(false));
	}

	private removeControlsForParagraphQuestionType(): void {
		this.addQuestionForm.removeControl('answerOptions');
		this.addQuestionForm.removeControl('allowOwnAnswer');
	}

	public onSubmit(event: Event): void {
		this.questionService.addQuestion(this.addQuestionForm.value);
		this.addQuestionForm.reset();
		this.closeModal(event);
	}

	public closeModal(event: Event): void {
		if (event.target === event.currentTarget) {
			this.modalClosed.emit();
		}
	}
}
