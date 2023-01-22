import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent  implements OnInit {

  @Input() currentUserId:string=''
  @Input() blogId:string=''
  @Input() likes=0
  @Input() dislikes=0;
  
  canLike:boolean=false;
  constructor(
    private blogService:BlogService,
    private snack:MatSnackBar
  ){}
  ngOnInit(): void {
    console.log(this.currentUserId)
    console.log(this.blogId);
    if(this.currentUserId!=undefined && this.blogId!=undefined){
      this.canLike=true;
    }
  }
  vote={
      userEmail:'',
      blog:'',
      likes:false,
      dislikes:false
  }
  OnLike(){

    if(this.currentUserId==undefined || this.blogId==undefined){
      this.snack.open(
        "Something went Wrong !! ",
        "OK",
        {
          duration:3000
        }
      )
    }
    //setting the vote 
    this.vote.userEmail=this.currentUserId;
    this.vote.blog=this.blogId;
    this.vote.likes=true;
    this.blogService.UpdateLike(this.vote).subscribe(
      (blog:any)=>{
        this.likes=blog.likes;  
        this.dislikes=blog.dislikes;
      },(error:any)=>{
        
        console.log(error.response)
          this.snack.open(
            // JSON.parse(error.error),
            error,
            "OK",
            {
              duration:3000
            }
          ) 
      }
    );
  }

}
