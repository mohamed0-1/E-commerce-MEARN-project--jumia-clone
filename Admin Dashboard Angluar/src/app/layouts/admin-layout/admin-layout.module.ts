import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { MapsComponent } from '../../maps/maps.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { AddProductComponent } from 'app/add-product/add-product.component';
import { EditproductComponent } from 'app/editproduct/editproduct.component';
import { OrdersComponent } from 'app/orders/orders.component';
import { UsersComponent } from 'app/users/users.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxPaginationModule } from "ngx-pagination";
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';




@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminLayoutRoutes),
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    FileUploadModule,
    NgxPaginationModule,
    TranslateModule.forChild({

      defaultLanguage:'en',

      loader:{

        provide:TranslateLoader,

        useFactory:createTranslateLoader,

        deps:[HttpClient]
      }

    })
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    AddProductComponent,
    EditproductComponent,
    MapsComponent,
    UsersComponent,
    OrdersComponent,
  ],
})
export class AdminLayoutModule {}
export function createTranslateLoader(http:HttpClient){

  return new TranslateHttpLoader(http,'./assets/i18n/','.json')
}
