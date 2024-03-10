import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { Router } from '@angular/router';

const emailPattern: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  form:FormGroup;
  formError:string;


  constructor(private formBuilder: FormBuilder, private http:HttpClient, private router:Router){}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['',[Validators.required]],
      email:['',[Validators.required, Validators.pattern(emailPattern)]],
      password:""
    })
  }

  submit():void{
    let user = this.form.getRawValue();

    if(user.name == "" || user.email == "" || user.password == ""){
       this.formError = "Please enter all the details";
    } else{
      this.http.post("http://localhost:5000/api/register", user, {
        withCredentials:true
      }).subscribe(()=> this.router.navigate(["/login"]), (err)=>{
          this.formError = err.error.message;
          
        });
      }
    }
  }


