import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  constructor(private http:HttpClient) { }
   url="http://localhost:8080/api/v1/";


  addEnquiry(enquiry:any):Observable<any>{
    return  this.http.post(
      this.url+"enquiry",
      enquiry,
    );
  }
}
