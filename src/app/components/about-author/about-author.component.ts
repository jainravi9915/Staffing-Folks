import { Component ,Input,OnInit} from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-about-author',
  templateUrl: './about-author.component.html',
  styleUrls: ['./about-author.component.css']
})
export class AboutAuthorComponent  implements OnInit{

  email=''
  linkedin=''
  aboutMe=''
  name=''
  @Input() owner!:string;
  constructor(
    private blogService:BlogService,
  ){}
  ngOnInit(): void {
    if(this.owner==null || this.owner.trim()=='')return ;
    this.blogService.getAuthor(this.owner).subscribe(
      (data:any)=>{
        console.log(data);
        this.name=data['firstName']+' '+data['lastName'];
        this.linkedin=data['linkedinUrl']
        this.aboutMe=data['aboutMe'];
        this.email=data['email']
        
      },(error)=>{

        console.log(error);
      }
    );
  }
}
