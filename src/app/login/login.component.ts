import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup;
  formError:string;

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private router: Router){}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['',[Validators.required]]
    })
  }
 
  login(){
    localStorage.setItem("token", "12344");
  }

  submit():void{

    let loginDetails = this.loginForm.getRawValue();

    if(loginDetails.email == "" || loginDetails.password == ""){
      this.formError = "Please enter email or password";
    }else{
      this.http.post("http://localhost:5000/api/login", loginDetails,{
        withCredentials: true
      }).subscribe(()=>this.router.navigate(['home']), (err)=>{
        this.formError = err.error.message;
      })
    }
    

  }

 

}
