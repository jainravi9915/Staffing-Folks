import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SharingService } from 'src/app/services/sharing.service';

@Component({
  selector: 'app-protoview-blog',
  templateUrl: './protoview-blog.component.html',
  styleUrls: ['./protoview-blog.component.css']
})
export class ProtoviewBlogComponent implements OnInit{
  @Input() blog:any={}

  @Output() currentBlog=new EventEmitter<any>();

  constructor(
    private router:Router,
    private sharing:SharingService,
  ){}
  ngOnInit(): void {
  }
  ReadArticle(){
    // console.log("read")
    // console.log(this.blog)
    // localStorage.setItem("currentBlog",this.blog)
    // this.sharing.current_readBlog.next(this.blog);
    this.sharing.setReadBlog(this.blog);
  }

}
