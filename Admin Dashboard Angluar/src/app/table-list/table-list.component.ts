import { Component, OnInit } from "@angular/core";
import { Iproduct } from "app/Models/product/iproduct";
import { ProductsService } from "app/services/productsService/products.service";
import { Router } from '@angular/router';


@Component({
  selector: "app-table-list",
  templateUrl: "./table-list.component.html",
  styleUrls: ["./table-list.component.css"],
})
export class TableListComponent implements OnInit {
  //data
  cp: number = 1;
  serachPrice: string = "";
  serachName: string = "";

  productList: any = {};
  prd: any = {};
  prd2: any = {};
  DeleteID: string = "kjgd";

  //constructor
  constructor(
    private ProductsServiceApi: ProductsService,
    private router: Router
  ) {
    // get all product
    this.ProductsServiceApi.getAllProducts().subscribe(
      (productList) => {
        this.productList = productList;
        console.log(this.productList);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ProductDetails(productID: string) {
    console.log("productID",productID);
    this.ProductsServiceApi.getProductByID(productID).subscribe(
      (prd) => {
        console.log(prd);
        this.prd = prd;
        this.prd2 = this.prd.product;
        console.log(this.prd2);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  sendID(prdID: string) {
    this.DeleteID = prdID;
  }

  DeleteProduct(DeleteProductID: number) {
    console.log("DeleteProductID", DeleteProductID);
    this.ProductsServiceApi.DeleteProduct(DeleteProductID).subscribe(
      (res) => {
        console.log(res);

        // return this.router.navigateByUrl("/table-list");

        // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        // this.router.onSameUrlNavigation = "reload";
        // this.router.navigate(["/table-list"]);
        location.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  }



  Search(type: any, value:any) {
    console.log("this.serach", value);
    console.log("this.serach", typeof (value));
    this.ProductsServiceApi.FilterProducts(type, value).subscribe(
      (res: any) => {
        console.log(res);
        this.productList = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {}
}
