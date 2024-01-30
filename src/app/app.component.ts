import { HttpClient } from '@angular/common/http';
import { Component,Input ,ViewChild, ElementRef} from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { RouterOutlet } from '@angular/router';
// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// import { HttpClientModule } from '@angular/common/http';
// import { HttpClient,HttpHeaders } from '@angular/common/http';
// import { error } from 'console';
import {TaskService} from './core/service/task.service';
import { Task } from './models/task.model';
import { SessionService } from './core/service/session.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export enum TaskStatus {
  ToDo = 1,
  InProgress = 2,
  Done = 3
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tasks: any[] = [];
  task: FormGroup;
  totalRecords: number = 0;
  page: number = 1;
  pageSize: number = 10;
  selectedOption: string=''; 
  taskStatuses = [
    { id: '', name: '' },
  ];
  taskId:number=0;

  @ViewChild('taskElement') public taskModal?: ElementRef;
  
  constructor(private taskService :TaskService,
    private http:HttpClient,
    private session: SessionService,
    private formBuilder: FormBuilder)
  {
    this.task = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      description: [''],
      taskId: ['', [Validators.required]],
      dueDate: [''],
    });
  }
  
  getTasks(){
    this.taskService.getTasks().subscribe(
      (data: Task[]) => {
        this.tasks = data;
      },
      (error) => {
        console.error('There was an error!', error);
      }
    )
  }

  ngOnInit(): void {
    this.fetchData();
    this.fetchStatus();
  }
  
  resetForm(){
   this.task.reset();
  }

  fetchStatus(){
    this.taskService.getStatus().subscribe((data:any)=>{
     this.taskStatuses =data;
    })
  }
  
  fetchData() {
    this.taskService.getTasksWithPagination(this.page, this.pageSize).subscribe(
      (data) => {
        this.tasks = data.data; 
        this.totalRecords = data.totalCount;
      },
      (error) => {
        console.error('Error fetching data', error);
      }
    );
  }
  
  getStatusValue(statusId: any): string {
    return this.taskStatuses[statusId-1]?.name;
  }

  addOrUpdateTask(){
    if (this.task.valid) {
      this.taskId < 1 ? this.addNewRow():this.updateTask();
    }
    else {
      for (const control in this.task.controls) {
        this.task.controls[control].markAsTouched();
      }
     }
  }

  getStatusClass(status: TaskStatus): string {
    switch (status) {
      case TaskStatus.ToDo:
        return 'bg-warning';
      case TaskStatus.InProgress:
        return 'bg-primary';
      case TaskStatus.Done:
        return 'bg-success';
      default:
        return '';
    }
  }

  addNewRow(){
    this.taskService.addNewTask(this.task.value).subscribe(
      (data) => {
        this.page--;
        this.totalRecords++;
        this.tasks.push(data);
        this.taskModal?.nativeElement.click();
      },
      (error) => {
        console.error('Error adding task:', error);
      }
    );
    }

   updateTask(){
      this.taskService.updateTask(this.taskId,this.task.value).subscribe(
        (data) => {

          const index = this.tasks.findIndex(item => item.id === this.taskId);

          if (index !== -1) {
            this.tasks[index] = {
              ...this.tasks[index],
              ...this.task.value
            };
          }
          this.taskId=0;
          this.resetForm();
          this.taskModal?.nativeElement.click();
        },
        (error) => {
          console.error('Error adding task:', error);
        }
      );
      }

  onPageChange(page: number) {
    this.page = page;
    this.fetchData();
  }

  getPages(totalCnt: number, pageSize: number): Array<number> {
    const numberOfPages = Math.ceil(totalCnt / pageSize);
    return Array.from({ length: numberOfPages }, (v, k) => k + 1);
  }

  editItem(item: any) {
    this.resetForm();
    item.dueDate =new Date(item.dueDate).toISOString().substring(0, 10);
    this.taskId =item.id;
    this.task.patchValue(item);
  }

  deleteItem(item: any) {
    this.taskService.deleteTask(item.id).subscribe(
      (data) => {
        this.page--;
        this.totalRecords--;
        this.tasks =this.tasks.filter(item => item.id !== item.id);
        console.log('deleted adding task:');

      },
      (error) => {
        console.error('Error adding task:', error);
      }
    );
    }
}
