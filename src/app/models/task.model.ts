// export class Task {
//   id?: number;
//   title: string;
//   description: string;
//   dueDate: Date;

//   constructor(id: number, title: string, description: string, dueDate: Date) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.dueDate = dueDate;
//   }
// }

export class Task {
    public id?: number;
  
    constructor(
      public title: string,
      public description: string,
      public dueDate: Date,
      public TaskId:number
    ) {}
  }