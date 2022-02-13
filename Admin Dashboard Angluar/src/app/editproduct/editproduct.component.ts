import { Component, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Iproduct } from "app/Models/product/iproduct";
import { ProductsService } from "app/services/productsService/products.service";

@Component({
  selector: "app-editproduct",
  templateUrl: "./editproduct.component.html",
  styleUrls: ["./editproduct.component.scss"],
})
export class EditproductComponent implements OnInit, OnChanges {
  prd: Iproduct;
  id: string = "";
  prd1: any = {};
  prd2: any = {};
      allprd:any={};
        allCategory:any[]=[];
  allCompany:any[]=[];
// in=mage vars
  public selectedFile: any;
  img: any = null;


  constructor(
    private activatedRoute: ActivatedRoute,
    private ProductsServiceApi: ProductsService,
    private router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    
    // take all categories from getAllProduct
     this.ProductsServiceApi.getAllProducts().subscribe(
      (res) => {
        this.allprd = res["products"];
        this.allprd.filter(item=>{
          if(this.allCategory.includes(item.category))
          {
            escape
          }
          else{
            this.allCategory.push(item.category);
            //console.log(" this.allCategory", this.allCategory);
          }
          if(this.allCompany.includes(item.company))
          {
            escape
          }
          else{
            this.allCompany.push(item.company);
            //console.log(" this.allCategory", this.allCategory);
          }
        })
      },
      (err) => {
        console.log(err);
      }
    );

    // get ID From route
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.id = paramMap.get("id");
      console.log(" this.id", this.id);
    });

    // get Product by Id To put it in the place holders for the form
    this.ProductsServiceApi.getProductByID(this.id).subscribe(
      (prd) => {
        console.log(prd);
        this.prd1 = prd;
        this.prd2 = this.prd1.product;
        console.log(" this.prd2", this.prd2);
      },
      (err) => {
        console.log(err);
      }
    );

    // this.prd = {
    //   name: this.prd2.name,
    //   price: this.prd2.price,
    //   description: this.prd2.description,
    //   // image:'';
    //   category: this.prd2.category,
    //   company: this.prd2.company,
    //   // colors: [];
    // };
    this.prd={
      nameEn:this.prd2.nameEn,
      nameAr:this.prd2.nameAr,
      price: this.prd2.price,
      descriptionEn:this.prd2.description,
      image: "",
      categoryparent: this.prd2.categoryparent,
      category:this.prd2.category,
      company:this.prd2.company
    }
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


  EditProduct(EditProduct: string, prd: Iproduct) {
    console.log(" EditProduct", EditProduct);
    this.prd.image = this.img;
    console.log("  this.prd.image", this.prd.image);
    this.ProductsServiceApi.EditProduct(EditProduct, prd).subscribe(
      (res) => {
        // return this.router.navigateByUrl('/Admin/newproduct');
        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        // this.router.onSameUrlNavigation = "reload";
        // this.router.navigate(["/Admin/newproduct"]);

        return this.router.navigateByUrl("/table-list");
      },
      (err) => {
        console.log(err);
      }
    );
  }





}
