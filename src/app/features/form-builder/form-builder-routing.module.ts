import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnswersComponent } from 'src/app/features/form-builder/components/answers/answers.component';
import { FormBuilderComponent } from 'src/app/features/form-builder/form-builder.component';

const routes: Routes = [
	{
		path: '',
		component: FormBuilderComponent,
	},
	{
		path: 'answers',
		component: AnswersComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class FormBuilderRoutingModule { }
