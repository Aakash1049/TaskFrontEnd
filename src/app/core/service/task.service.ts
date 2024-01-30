import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/task.model';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'tasks';
  private taskStatusApiUrl = 'status';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }
  
  getTasksWithPagination(page: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('pageNumber', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get(this.apiUrl, { params });
  }

  addNewTask(task:any): Observable<any> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id:number,task:any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Task>(url, task);
  }

  getStatus(): Observable<Task[]> {
    return this.http.get<any[]>(this.taskStatusApiUrl);
  }
  
  deleteTask(id:number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<Task>(url);
  }
}
