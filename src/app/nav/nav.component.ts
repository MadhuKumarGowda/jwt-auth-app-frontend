import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Emitters } from '../Emitters/emitters';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  authenticate:boolean = true;
  constructor(private router:Router, private http:HttpClient){}
  
  
  ngOnInit(): void {
  
    Emitters.authEmitters.subscribe((auth:boolean)=>{      
      this.authenticate = auth;
    })
  }

  logout(){   
    this.http.post("http://localhost:5000/api/logout",{},{
      withCredentials: true
    }).subscribe(()=>this.authenticate = false)         
  }

}
