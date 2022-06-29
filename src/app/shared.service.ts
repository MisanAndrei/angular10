import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/User.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "https://localhost:7195/api/UserInput"

  constructor(private http:HttpClient) { }

    //Get active password
    getPassword(): Observable<User>{
      return this.http.get<User>(this.APIUrl)
    }

  createPassword(user:User): Observable<User>{
    console.log("service id");
    console.log(user.id);
    return this.http.post<User>(this.APIUrl, user.id)
  }
}
