import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../classes/user';
import { AuthGuard } from '../auth.guard';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[FooterComponent ]
})
export class HeaderComponent implements OnInit {

user : User = new User();

  static showMenu: boolean =false;
  
  constructor(private http : HttpClient, private router : Router, public guard : AuthGuard, private fc : FooterComponent ) { }

  ngOnInit(): void {
    let ss =sessionStorage.getItem("person")
    if(ss !=null){
    this.user=JSON.parse(ss)
}
}

doact(){
  this.fc.update(); 
}


  logout (): void{
    console.log("Logout")
    sessionStorage.removeItem("connected"); 
        this.router.navigate(['login'])  
        sessionStorage.removeItem("user")
    this.fc.update(); 
    //ChangeDetectorRef.detectChanges()
  }      
}
    
