export class User{

    email!:string;
    fullName!:string;
    description!:string;
    contact!:string;

    User(email:string,fullName:string,description:string,contact:string){
        this.email=email;
        this.fullName=fullName;
        this.description=description;
        this.contact=contact;
    }

}