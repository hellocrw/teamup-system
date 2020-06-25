import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Result } from 'src/app/dto/Result';
import { Observable } from 'rxjs';
import { StudyPlanDto } from 'src/app/dto/StudyPlanDto';

@Injectable({
  providedIn: 'root',
})
export class StudyPlanService {
  private static API = 'api/study-plan';

  constructor(private http: _HttpClient) {}

  getStudyPlans(userId: string): Observable<Result> {
    return this.http.get<Result>(`${StudyPlanService.API}/getStudyPlans/${userId}`);
  }

  insertStudyPlan(studyPlan: StudyPlanDto): Observable<Result> {
    return this.http.post<Result>(`${StudyPlanService.API}/insertStudyPlan`, studyPlan);
  }
}
