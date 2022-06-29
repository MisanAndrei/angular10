import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { User } from '../models/User.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-userinput',
  templateUrl: './userinput.component.html',
  styleUrls: ['./userinput.component.css']
})
export class UserinputComponent implements OnInit {
  user: User = { id: 0, CreationDate: new Date(), Password: ""};
  test:any;
  timeLeft: number = 30;
  interval: any;
  message: any;
  passwordCreated: boolean = false;
  currentuser: any;


  constructor(private sharedService: SharedService) {
    
   }

  ngOnInit(): void {
    this.passwordCreated = false;
    this.GetPassword();

    this.message = "";
  }
  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } 
      else {
        this.passwordCreated = false;
        clearInterval(this.interval);
      }
    },1000)
  }

    GetPassword(){
      this.sharedService.getPassword()
      .subscribe(
        response => {
          this.user = response;
          this.test = this.user.id
          if (this.user.id > 0){
            this.startTimer();
            this.passwordCreated = true;
          }
          else{
            this.passwordCreated = false;
            clearInterval(this.interval);
          }
          
        }
      )
    }
    CreateUserPassword(){
      console.log("merge apelarea");
      console.log(this.user);
      this.sharedService.createPassword(this.user).subscribe((result)=>{
        console.log(result);
        
        this.user = result;
        this.passwordCreated = true;
        this.timeLeft = 30;
        this.currentuser = this.user.id;
        this.startTimer();
      })
    }
}
