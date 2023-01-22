import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowBlogHomeService {
  blog:any;
  private showBlogSubject=new BehaviorSubject<any>(null);
  dummyNameForShowBlogSubject$=this.showBlogSubject.asObservable();
  constructor() {}
  setBlog(blog:any){
    this.blog=blog;
    this.showBlogSubject.next(blog);
  }
  getBlog(){
    return this.blog;
  }
}
