import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient,

  ) { }
  // create user  

  localhost="http://localhost:8080/user"

  addUser(user:any):Observable<any>{
    return this.http.post(
      this.localhost,
      user
    )
  }
}
