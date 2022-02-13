import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forRoot({

      defaultLanguage:'en',

      loader:{

        provide:TranslateLoader,

        useFactory:createTranslateLoader,

        deps:[HttpClient]
      }

    })
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
export function createTranslateLoader(http:HttpClient){

  return new TranslateHttpLoader(http,'./assets/i18n/','.json')

}
