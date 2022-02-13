import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Adminlogin } from "app/Models/login/adminlogin";
import { User } from "app/Models/user/user";
import { ProductsService } from "app/services/productsService/products.service";
import { UserService } from "app/services/user/user.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  admindata: any = {};
  allAdmins: any = {};
  public selectedFile: any;
  img: any = null;
  user: User;
  newuser: User;

  IDfrmLocalStorage = localStorage
    .getItem("userId")
    .slice(1, localStorage.getItem("userId").length - 1);

  constructor(
    private userAPI: UserService,
    private ProductsServiceApi: ProductsService,
    private router: Router ,
    public translate: TranslateService
  ) {
    console.log("IDfrmLocalStorage", this.IDfrmLocalStorage);

    this.user = {
      name: "",
      email: "",
      password: "",
      role: "",
      image: "",
    };
    this.newuser = {
      name: "",
      email: "",
      password: "",
      role: "",
      image: "",
    };
  }

  ngOnInit() {
    this.userAPI.showCurrentUser().subscribe(
      (res) => {
        console.log(res, "kkk");
        this.admindata = res.user;
        console.log("this.admindata", this.admindata);
      },
      (err) => {
        console.log(err);
      }
    );

    //   this.userAPI.getSingleUser(this.IDfrmLocalStorage).subscribe(
    //     (res) => {
    //       console.log(res);
    //       this.allAdmins = res.user;
    //       // console.log("this.admindata", this.admindata);
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // }

    this.userAPI.getAllAdmins().subscribe(
      (res) => {
        console.log("resadmins", res);
        this.allAdmins = res.users;
        console.log("this.allAdmins", this.allAdmins);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  UpdateUser() {
    this.user.image = this.img;
    this.user.role = 'admin';
    this.userAPI.UpdateUser(this.user).subscribe(
      (res) => {
        console.log("UpdateUser", res);
        localStorage.setItem("token", JSON.stringify(res.token));
        // document.cookie = `token=${res.token}`;
        localStorage.setItem("userId", JSON.stringify(res.user.userId));
        // this.router.navigate(["/user-profile"]);
        window.location.reload()
      },
      (err) => {
        console.log(err);
      }
    );
  }
  // clearStorage() {
  //  localStorage.clear()
  // }

  CreateAdmin() {
    this.newuser.image = this.img;
    this.userAPI.CreateAdmin(this.newuser).subscribe(
      (res) => {
        console.log("CreateAdmin", res);
        location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  uploadfile(event) {
    this.selectedFile = event.target.files[0];
    let formData: FormData = new FormData();
    formData.append("image", this.selectedFile, this.selectedFile.name);
    return this.ProductsServiceApi.upload(formData).subscribe(
      (res) => {
        console.log(res);
        this.img = res.image;
        console.log("this.img,", this.img);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
