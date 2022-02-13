
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Iproduct } from "app/Models/product/iproduct";
import { ProductsService } from "app/services/productsService/products.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

//
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import {saveAs} from 'file-saver';
import { TranslateService } from "@ngx-translate/core";
// import { FormBuilder, FormGroup } from "@angular/forms";




@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit {
  imgFile: string;
  prd: Iproduct;
  public selectedFile: any;
  TcknfrmLocalStorage = localStorage
    .getItem("token")
    .slice(1, localStorage.getItem("token").length - 1);

  //
  prd2: any = {};
  selectedCategory: string = "";
  selectedCompany: string = "";
  allCategory: any[] = [];
  allCompany: any[] = [];
  img: any = null;

  //test
  uploader: FileUploader = new FileUploader({
    url: "http://localhost:5000/api/v1//products/uploadImage",
  });
  attachmentList: any = [];
  //test

  constructor(
    private ProductsServiceApi: ProductsService,
    private router: Router,
    private httpClient: HttpClient,
    public translate:TranslateService
  ) {
    //test
     this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      this.attachmentList.push(JSON.parse(response));
    };
    //test
    this.prd={
        nameAr: "",
        nameEn: "",
        price: null,
        descriptionAr: "",
        descriptionEn: "",
        image: "",
        category: "",
        categoryparent:"",
        company:"",
        quantity:null,
        size:null,
        color: "",
    }
    // this.prd = {
    //   name: "",
    //   price: null,
    //   description: " ",
    //   image: this.img,
    //   category: "",
    //   company: " ",
    //   // colors: [];
    // };
  }

  AddProduct() {
    // this.prd.category = this.selectedCategory;
    // this.prd.company = this.selectedCompany;
    this.prd.image = this.img;
    console.log("  this.prd.image", this.prd.image);

    this.ProductsServiceApi.addProduct(this.prd).subscribe(
      (res) => {
        return this.router.navigateByUrl("/table-list");
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

  //1
  // AddProduct() {
  //   let formData: FormData = new FormData();
  //   formData.append("image", this.selectedFile, this.selectedFile.name);
  //   return this.ProductsServiceApi.upload(formData).subscribe(
  //     (res) => {
  //       console.log(res);
  //       this.img = res.image;
  //       console.log("this.img,", this.img);

  //       this.prd.category = this.selectedCategory;
  //       this.prd.company = this.selectedCompany;
  //       this.prd.image = this.img;
  //       console.log("  this.prd.image", this.prd.image);

  //       this.ProductsServiceApi.addProduct(this.prd).subscribe(
  //         (res) => {
  //           return this.router.navigateByUrl("/table-list");
  //         },
  //         (err) => {
  //           console.log(err);
  //         }
  //       );
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // uploadfile(event) {
  //   this.selectedFile = event.target.files[0];
  // }

  //1

  // onImageChange(e) {
  //   const reader = new FileReader();

  //   if (e.target.files && e.target.files.length) {
  //     const [file] = e.target.files;
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       this.imgFile = reader.result as string;
  //       this.uploadForm.patchValue({
  //         imgSrc: reader.result,
  //       });
  //     };
  //   }
  // }

  ngOnInit(): void {
    // take all categories from getAllProduct
    this.ProductsServiceApi.getAllProducts().subscribe(
      (res) => {
        this.prd2 = res["products"];
        console.log(" this.prd2add", this.prd2);
        
        this.prd2.filter((item) => {
                  console.log("item.category.name", item.category.name);

          if (this.allCategory.includes(item.category.name)) {
            escape;
          } else {
            this.allCategory.push(item.category.name);
          }
          if (this.allCompany.includes(item.company.name)) {
            escape;
          } else {
            this.allCompany.push(item.company.name);
          }
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
}


  //  form: FormGroup;
  //    this.form = this.fb.group({
  //     name: [''],
  //     avatar: [null]
  //   })
  //     form: FormGroup,
  //     public fb: FormBuilder,

//   uploadFile(event) {
//     const file = (event.target as HTMLInputElement).files[0];
//     this.form.patchValue({
//       avatar: file
//     });
//     this.form.get('avatar').updateValueAndValidity()
//   }

// submitForm() {
//   var formData: any = new FormData();
//   formData.append("name", this.form.get('name').value);
//   formData.append("avatar", this.form.get('avatar').value);

//   this.httpClient.post('http://localhost:5000/api/v1//products/uploadImage', formData).subscribe(
//     (response) => console.log(response),
//     (error) => console.log(error)
//   )
// }




//  fileChange(event) {
//     let fileList= event.target.files;
//     console.log("fileList", fileList);

//     if (fileList.length > 0) {
//       let file: File = fileList[0];
//           console.log("file", file);
//           console.log("file", file.name);

//       let formData: FormData = new FormData();
      
//       formData.append("image", event.target.files[0], event.target.files[0].name);
//          formData.forEach((value,key) => {
//       console.log("ttttt", key,value)
//     });
  

//       this.httpClient
//         .post(`http://localhost:5000/api/v1/products/uploadImage`, formData, this.httpOptions1)
//         .subscribe(
//           (data) => console.log("success", data),
//           (error) => console.log(error)
//         );
//     }
//   }
