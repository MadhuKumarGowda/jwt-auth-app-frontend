import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  constructor(private router:Router){}
  
  token:string;
  ngOnInit(): void {
    this.token = localStorage.getItem("token")!;
  }

  logout(){     
    this.token = null!;
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
   
  }

}
