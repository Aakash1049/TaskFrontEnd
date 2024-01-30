import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  model :any={userName:'',password:''};
 
  onSubmit():void{
    const { username, password } = this.model;
    
    // For the purpose of this example, we'll just log the credentials
    console.log(username, password);
  }
}
