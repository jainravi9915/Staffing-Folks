import { ViewportRuler } from '@angular/cdk/scrolling';
import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { searchTags } from 'src/app/types/searchTags.model';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements OnInit {

  blogs:any[]=[];
  view="C"
  title=""
  noResult:boolean=true;
  constructor(
    private blogService:BlogService
  ){}
  chooseTags:any[]=[]  
  ngOnInit(): void {
    this.setTitle();
    this.chooseTags=["games","interview","preparation","nature","politics"]
  }
  setTitle(){
    this.title="Result Viewing for : "+this.view;
  }
  getBlogsByTags(view:string){
    
    this.view=view;
    this.setTitle();
    this.blogService.getBlogsByTags(view).subscribe(
      (data:any)=>{
        if(data==null || data==undefined || data.length==0){
          this.noResult=true;
          this.blogs=[];
        }else{
          this.noResult=false;
          this.blogs=data;
          console.log(data);
        }
      },(error:any)=>{
        console.log("Something went wrong for  languages")
      }
    )
  }
   
  getBlogsBySearch(view:string){
    this.setTitle();
    this.blogService.getBlogsBySearch(view).subscribe(
      (data:any)=>{
        console.log(data)
        if(data==null || data==undefined || data.length==0){
          this.noResult=true;
          this.blogs=[];
        }else{
          this.blogs=data;
          this.noResult=false;
          console.log(data)
        }
      },(error)=>{
        console.log("Something went wrong with Search ()")
      }
    )
  }

}
