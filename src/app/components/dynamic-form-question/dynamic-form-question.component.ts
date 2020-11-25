import {Component, Input} from '@angular/core';
import {QuestionBase} from '../../models/question-base.model';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-question',
  template: `
    <div [formGroup]="form">
      <label [attr.for]="question.key">{{question.label}}</label>
      <div [ngSwitch]="question.controlType">
        <input
          type="question.type"
          *ngSwitchCase="'textbox'"
          [formControlName]="question.key"
          [id]="question.key"
          [type]="question.type"
        >
        <select
          [formControlName]="question.key"
          [id]="question.key"
          *ngSwitchCase="'dropdown'"
        >
          <option
            *ngFor="let opt of question.options"
            [value]="opt.key">{{opt.value}}</option>
        </select>
      </div>

      <div class="errorMessage" *ngIf="!isValid">
        {{ question.label }} is required
      </div>
    </div>
  `,
  styleUrls: ['./dynamic-form-question.component.css']
})
export class DynamicFormQuestionComponent {
  @Input() question: QuestionBase<string>;
  @Input() form: FormGroup;
  get isValid(): boolean { return this.form.controls[this.question.key].valid; }
}
