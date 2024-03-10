import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../Emitters/emitters';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  message:string;
  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.http.get("http://localhost:5000/api/user", {
      withCredentials:true,
    }).subscribe((res:any)=>{      
      this.message = `Hi ${res.name}`;
      Emitters.authEmitters.emit(true);
    },(err)=>{
      this.message = err.error.message;
      Emitters.authEmitters.emit(false);
    })
  }

}
