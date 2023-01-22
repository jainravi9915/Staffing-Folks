import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  implements OnInit{
  spinner:boolean=false;
  // loginForm!:FormGroup;
  user={
    email:'' ,
    password:''
  }
  constructor(
    private blogService:BlogService,
    private loginService:LoginService,
    private snack:MatSnackBar,
    private router:Router,
    private fb:FormBuilder,
    ){}

    
    loginForm=new FormGroup(
      {
        email: new FormControl('',[Validators.required,Validators.email]),
        password: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(10)]),
        // email:['',Validators.required],
        // password:['',Validators.required],
      } 
    )
  ngOnInit(): void {

    this.blogService.getCurrentUser().subscribe(
      (data:any)=>{
        if(data!=null && data!=undefined){
          this.router.navigate(["/user-dashboard"]);
        }
        
      },(error:any)=>{
        this.loginService.logout();
        this.snack.open("Please login First !! ","OK" , {
          duration:3000,
          verticalPosition:'top'
        })
        console.log("Some Error")
      }      
    )
   }

   get email(){
    return this.loginForm.get('email');
   }
   get password(){
    return this.loginForm.get('password');
   }
   
   reset(){
    this.spinner=false;
    this.loginForm.reset();
   }
  formSubmit(){
    this.spinner=true;
    console.log(this.user)
    // this.email=this.loginForm.value['email'];

    // this.user.email=this.loginForm.value['email'];
    // this.user.password=this.loginForm.value['password'];
    // console.log(this.user)
    // return ;
    this.blogService.login(this.user).subscribe(
      (response:any)=>{
        console.log("LOGIN SUCCESSFULLY");
        console.log(response);
        //spinner off and form reset
        this.reset();
        
        this.loginService.loginUser(response);
        this.blogService.getCurrentUser().subscribe(
          (user:any)=>{
            this.loginService.setRole(user.role);
            this.spinner=false;
            if(user.role=="NORMAL"){
              this.router.navigate(['/user-dashboard'])
              this.loginService.loginStatusSubject.next(true);
            }else if(user.role=="ADMIN"){
              this.router.navigate(['/']);
              this.loginService.loginStatusSubject.next(true);
            }else{
              this.loginService.loginStatusSubject.next(false);
              this.loginService.logout();
            }
          },(error:any)=>{
            this.reset();
            
            Swal.fire(
              {
                title:'ERROR',
                text:'Something went wrong !! Try Again',
                icon:'error'
              }
            )
              
          }
        )
      },(error:any)=>{
        this.reset();
        Swal.fire(
          {
            title:'ERROR',
            text:'Bad Credentials. Please enter correct Details',
            icon:'error'
          }
        )
        
      }
    )
  }
}
