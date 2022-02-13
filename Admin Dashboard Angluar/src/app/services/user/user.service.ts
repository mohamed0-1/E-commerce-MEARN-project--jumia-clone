import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Adminlogin } from "app/Models/login/adminlogin";
import { User } from "app/Models/user/user";
import { environment } from "environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private httpOptions = {};
  admindata: Adminlogin;
  TcknfrmLocalStorage = localStorage
    .getItem("token")
    .slice(1, localStorage.getItem("token").length - 1);

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.TcknfrmLocalStorage}`,
      }),
    };
  }

  //current user
  showCurrentUser(): Observable<any> {
    return this.httpClient.get<any>(
      environment.APIURL + "/users/showMe",
      this.httpOptions
    );
  }

  //admins
  getAllAdmins(): Observable<any> {
    console.log("TcknfrmLocalStorage", this.TcknfrmLocalStorage);

    return this.httpClient.get<any>(
      environment.APIURL + "/users/getAdmins",
      this.httpOptions
    );
  }
  //admins
  getSingleUser(id: string): Observable<any> {
    return this.httpClient.get<any>(
      environment.APIURL + "/users/" + id,
      this.httpOptions
    );
  }

  //get all users
  getAllUsers(): Observable<any> {
    return this.httpClient.get<any>(
      environment.APIURL + "/users",
      this.httpOptions
    );
  }
  //Create userslocalhost:5000/api/v1/auth/register
  CreateAdmin(newUser: User): Observable<any> {
    return this.httpClient.post<any>(
      environment.APIURL + "/users/CreateAdmin",
      newUser,
      this.httpOptions
    );
  }

  //Update users  localhost:5000/api/v1/users/updateUser
  UpdateUser(newUser: User): Observable<any> {
    return this.httpClient.patch<any>(
      environment.APIURL + "/users/updateUser",
      newUser,
      this.httpOptions
    );
  }

  // addProduct(newprd: Iproduct): Observable<Iproduct | undefined> {
  //   return this.httpClient.post<Iproduct>(
  //     `${environment.APIURL}/products`,
  //     newprd,
  //     this.httpOptions
  //   );
  // }
}
