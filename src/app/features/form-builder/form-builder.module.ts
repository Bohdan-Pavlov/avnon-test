import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AddQuestionModalComponent } from 'src/app/features/form-builder/components/add-question-modal/add-question-modal.component';
import { AnswersComponent } from 'src/app/features/form-builder/components/answers/answers.component';
import { FormBuilderRoutingModule } from 'src/app/features/form-builder/form-builder-routing.module';
import { FormBuilderComponent } from 'src/app/features/form-builder/form-builder.component';

@NgModule({
  declarations: [
    FormBuilderComponent,
    AddQuestionModalComponent,
    AnswersComponent,
  ],
  imports: [
    CommonModule,
    FormBuilderRoutingModule,
    ReactiveFormsModule
  ]
})
export class FormBuilderModule { }
