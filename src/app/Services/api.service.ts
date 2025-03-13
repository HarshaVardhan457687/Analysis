import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { map } from 'rxjs/operators';

interface TeamProgress {
  progress: number;
}

interface TeamMemberProgressDto {
  userId: number;
  userName: string;
  userProfile: string;
  role: string;
  totalTasks: number;
  completedTasks: number;
  progress: number;
}

interface Team {
  id: number;
  name: string;
}

interface ObjectivePerformance {
  AT_RISK: number;
  ON_TRACK: number;
  COMPLETED: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:8060/api';

  constructor(private http: HttpClient) { }

  getObjectivePerformance(projectId: number): Observable<{name: string, value: number}[]> {
    return this.http.get<ObjectivePerformance>(`${this.baseUrl}/objective/objective-performance/${projectId}`)
      .pipe(
        map(data => [
          { name: 'On Track', value: data.ON_TRACK || 0 },
          { name: 'At Risk', value: data.AT_RISK || 0 },
          { name: 'Completed', value: data.COMPLETED || 0 }
        ]),
        catchError(() => of([
          { name: 'On Track', value: 0 },
          { name: 'At Risk', value: 0 },
          { name: 'Completed', value: 0 }
        ]))
      );
  }

  getTeams(projectId: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.baseUrl}/teams?projectId=${projectId}`)
      .pipe(
        catchError(() => of([]))
      );
  }

  getTeamProgress(projectId: number, teamId: number): Observable<TeamProgress> {
    return this.http.get<TeamProgress>(`${this.baseUrl}/teams/progress?projectId=888290452986&teamId=889191999882`)
      .pipe(
        catchError(() => of({ progress: 0 }))
      );
  }

  getTeamMembersProgress(teamId: number, projectId: number): Observable<TeamMemberProgressDto[]> {
    return this.http.get<TeamMemberProgressDto[]>(`${this.baseUrl}/teams/project/members-progress?teamId=${teamId}&projectId=${projectId}`)
      .pipe(
        catchError(() => of([]))
      );
  }
}
