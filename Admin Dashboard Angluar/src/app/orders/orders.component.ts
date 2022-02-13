import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Iproduct } from 'app/Models/product/iproduct';
import { OrdersService } from 'app/services/orders/orders.service';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.css"],
})
export class OrdersComponent {
  orderList: any = {};
  orderCount: number = null;
  ordrItems: [];

  constructor(private orderService: OrdersService , public translate:TranslateService) {
    this.orderService.getAllOrders().subscribe(
      (orderList) => {
        console.log(orderList);
        this.orderList = orderList;
        this.orderCount = orderList.count;

        // this.orderList=orderList.orders
        // for(var i =0 ; i<orderList.orders.)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getSingleOrder(orderID: string) {
    console.log("orderID", orderID);
    this.orderService.getSingleOrder(orderID).subscribe(
      (res:any) => {
        console.log("orderDetails", res.order.orderItems);
        this.ordrItems = res.order.orderItems;
                console.log(" this.ordrItems ", this.ordrItems);

        // this.prd2 = this.prd.order;
        // console.log(this.prd2);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
