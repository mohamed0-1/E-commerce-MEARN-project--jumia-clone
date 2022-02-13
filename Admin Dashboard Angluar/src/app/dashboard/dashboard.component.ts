import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OrdersService } from 'app/services/orders/orders.service';
import { ProductsService } from 'app/services/productsService/products.service';
import { UserService } from 'app/services/user/user.service';
import * as Chartist from 'chartist';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements  AfterViewInit {
  productList: any = {};
  numofProducts: number = 0;
  orderList: any = {};
  orderCount: number = null;
  usersCount: number = null;
  @ViewChild("chart") chart!: ElementRef;

  startAnimationForBarChart(chart) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on("draw", function (data) {
      if (data.type === "bar") {
         data.element.attr({
           style: "stroke-width: 80px;",
         });
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 3,
            easing: "ease",
          },
        });
      }
    });

    seq2 = 0;
  }
  constructor(
    private ProductsServiceApi: ProductsService,
    private orderService: OrdersService,
    private userAPI: UserService,
    public translate:TranslateService

  ) {
    // ///////////////////////////////1
    this.ProductsServiceApi.getAllProducts().subscribe(
      (productList) => {
        this.productList = productList;
        this.numofProducts = this.productList["products"].length;
        console.log("this.numofProducts", this.numofProducts);
        /* ----------==========     Products Subscription Chart initialization    ==========---------- */

        var datawebsiteViewsChart = {
          labels: ["Products"],
          series: [[Number(this.numofProducts)]],
        };

        var optionswebsiteViewsChart = {
          axisX: {
            showGrid: true,
            // barThickness: 600,
            maxBarThickness: 4000,
          },
          low: 0,
          high: 70,
           divisor: 4,
          seriesBarDistance: 5,
          chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
        };
        var responsiveOptions: any[] = [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ];
        var websiteViewsChart = new Chartist.Bar(
          "#websiteViewsChart",
          datawebsiteViewsChart,
          optionswebsiteViewsChart,
          responsiveOptions
        );

        //start animation for the Emails Subscription Chart
        this.startAnimationForBarChart(websiteViewsChart);
      },
      (err) => {
        console.log(err);
      }
    );

    // ///////////////////////////////2
    this.orderService.getAllOrders().subscribe(
      (orderList) => {
        console.log(orderList);
        this.orderList = orderList;
        this.orderCount = orderList.count;
        
        console.log("orderListorderListorderList", orderList);
        /* ----------==========     Order Subscription Chart initialization    ==========---------- */

        var datawebsiteViewsChart = {
          labels: ["Orders"],
          series: [[Number(this.orderCount)]],
        };

        var optionswebsiteViewsChart = {
          axisX: {
            showGrid: false,
            // barThickness: 600,
            maxBarThickness: 4000,
          },
          low: 0,
          high: 50,
          chartPadding: { top: 0, right: 1, bottom: 0, left: 0 },
        };
        var responsiveOptions: any[] = [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ];
        var websiteViewsChart = new Chartist.Bar(
          "#websiteViewsChart2",
          datawebsiteViewsChart,
          optionswebsiteViewsChart,
          responsiveOptions
        );

        //start animation for the Emails Subscription Chart
        this.startAnimationForBarChart(websiteViewsChart);
      },
      (err) => {
        console.log(err);
      }
    );

    //// ///////////////////////////////3
    this.userAPI.getAllUsers().subscribe(
      (res) => {
        console.log( "userAPI", res);
        this.usersCount = res.nbHits;

        /* ----------==========     Users Subscription Chart initialization    ==========---------- */

        var datawebsiteViewsChart = {
          labels: ["Users"],
          series: [[Number(this.usersCount)]],
        };

        var optionswebsiteViewsChart = {
          axisX: {
            showGrid: false,
            // barThickness: 600,
            maxBarThickness: 4000,
          },
          low: 0,
          high: 50,
          chartPadding: { top: 0, right: 1, bottom: 0, left: 0 },
        };
        var responsiveOptions: any[] = [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ];
        var websiteViewsChart = new Chartist.Bar(
          "#websiteViewsChart3",
          datawebsiteViewsChart,
          optionswebsiteViewsChart,
          responsiveOptions
        );

        //start animation for the Emails Subscription Chart
        this.startAnimationForBarChart(websiteViewsChart);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngAfterViewInit(): void {
      this.chart.nativeElement.style.background = "gray";
      this.chart.nativeElement.style.width = '300px';
      
  }
}



  // startAnimationForLineChart(chart){
  //     let seq: any, delays: any, durations: any;
  //     seq = 0;
  //     delays = 80;
  //     durations = 500;

  //     chart.on('draw', function(data) {
  //       if(data.type === 'line' || data.type === 'area') {
  //         data.element.animate({
  //           d: {
  //             begin: 600,
  //             dur: 700,
  //             from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
  //             to: data.path.clone().stringify(),
  //             easing: Chartist.Svg.Easing.easeOutQuint
  //           }
  //         });
  //       } else if(data.type === 'point') {
  //             seq++;
  //             data.element.animate({
  //               opacity: {
  //                 begin: seq * delays,
  //                 dur: durations,
  //                 from: 0,
  //                 to: 1,
  //                 easing: 'ease'
  //               }
  //             });
  //         }
  //     });

  //     seq = 0;
  // };



    //   /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    //   const dataDailySalesChart: any = {
    //       labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    //       series: [
    //           [12, 17, 7, 17, 23, 18, 38]
    //       ]
    //   };

    //  const optionsDailySalesChart: any = {
    //       lineSmooth: Chartist.Interpolation.cardinal({
    //           tension: 0
    //       }),
    //       low: 0,
    //       high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    //       chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    //   }

    //   var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    //   this.startAnimationForLineChart(dailySalesChart);







    //   /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    //   const dataCompletedTasksChart: any = {
    //       labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
    //       series: [
    //           [230, 750, 450, 300, 280, 240, 200, 190]
    //       ]
    //   };

    //  const optionsCompletedTasksChart: any = {
    //       lineSmooth: Chartist.Interpolation.cardinal({
    //           tension: 0
    //       }),
    //       low: 0,
    //       high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    //       chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    //   }

    //   var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    //   // start animation for the Completed Tasks Chart - Line Chart
    //   this.startAnimationForLineChart(completedTasksChart);