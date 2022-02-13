import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: '',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: '',  icon:'person', class: '' },
    { path: '/table-list', title: 'Products List',  icon:'content_paste', class: '' },
    { path: '/addproduct', title: 'Add Product',  icon:'add_shopping_cart', class: '' },
    { path: '/orders', title: 'Orders',  icon:'filter_none', class: '' },
    { path: '/users', title: 'Users',  icon:'group', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(public translate:TranslateService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
