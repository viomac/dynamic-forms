import { Component } from '@angular/core';
import {Observable} from 'rxjs';
import {QuestionBase} from './models/question-base.model';
import {QuestionService} from './services/question.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="row justify-content-center">
      <div class="col-md-5 col-sm-5">
        <h2 class="mt-5 mb-4">Job Application for Heroes</h2>
        <app-dynamic-form [questions]="questions$ | async"></app-dynamic-form>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService) {
    this.questions$ = service.getQuestions();
  }
}
