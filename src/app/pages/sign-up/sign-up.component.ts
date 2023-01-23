import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types/User.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignupComponent  implements OnInit{
  constructor(
    private userService:UserService,
    private route:Router,
    private snak: MatSnackBar,
    private fb:FormBuilder,
    private enquiryService:EnquiryService,
  ){}
  
  enquiryForm!:FormGroup;
  registerForm! :FormGroup
  submitted:boolean=false;
  spinner:boolean=false;

  phone_maxLength=10
  phone_minLength=12
  userRequest=new User();
    user={
      email:'',
      phone:'',
      fullName:'',
      description:''
    }
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"; 
  ngOnInit(): void {  
     
  }
 get registerFormControl() {
    return this.registerForm.controls;
  }

  formSubmit(form:any){
    this.spinner=true;
    console.log(form.value)
    // console.log(this.user)
    // if(this.user.email=='' || this.user.email==null){
    //   // alert("UserName Required")
    //   this.snak.open("Email is Required" , 'Ok' ,{
    //     duration:3000,
    //     verticalPosition:'top',
    //     horizontalPosition:'right'
    //   });
    //   return ;
    // }
    this.enquiryService.addEnquiry(form.value).subscribe( 
      ( data:any)=>{
        console.log(data);
        Swal.fire("Success", "Deails is Submitted Our team will contact you ASAP !!");
        this.spinner=false;
        form.reset();
        
      },(error :any) => {
        Swal.fire("error", "Somethign went wrong !! please try Again  !!");
        this.spinner=false;
      }
      );
      
      
    


    // this.userService.addUser(this.user).subscribe( (data)=>{
    //   // alert("Success");   
    //   this.spinner=false;
    //   Swal.fire("Success", "Deails is Submitted Our team will contact you ASAP !!");
    //   this.snak.open("Success ", 'OK', {
    //     duration:3000,
    //   })

    //   this.route.navigate(["/login"]);
    // },(error:any)=>{
    //   console.log(error)
    //   this.snak.open('Something went Wrong !! ', 'Ok',{
    //     duration:3000,
    //   })
      // alert("Something went Wrong");
    // }
    
    // );

  }


}
