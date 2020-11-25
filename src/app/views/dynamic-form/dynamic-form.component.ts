import {Component, Input, OnInit} from '@angular/core';
import {QuestionBase} from '../../models/question-base.model';
import {FormGroup} from '@angular/forms';
import {QuestionControlService} from '../../services/question-control.service';

@Component({
  selector: 'app-dynamic-form',
  template: `
    <div>
      <form (ngSubmit)="onSubmit()" [formGroup]="form">
        <div *ngFor="let question of questions" class="form-row">
          <app-question [question]="question" [form]="form"></app-question>
        </div>

        <div class="form-row">
          <button type="submit" [disabled]="!form.valid">Save</button>
        </div>
      </form>

      <div *ngIf="payload" class="form-row">
        <strong>Saved the following values</strong><br>
        {{payload}}
      </div>
    </div>
  `,
  styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
  @Input() questions: QuestionBase<string>[] = [];
  form: FormGroup;
  payload = '';

  constructor(private qcs: QuestionControlService) { }

  ngOnInit(): void {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit(): void {
    this.payload = JSON.stringify(this.form.getRawValue());
  }
}

