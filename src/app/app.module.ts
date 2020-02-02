import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';// Import your library
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { appRoutes } from './routes';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { BannerComponent } from './banner/banner.component';
import { MapSectionComponent } from './map-section/map-section.component';
import { CardComponent } from './card/card.component';
import { OwlModule } from 'ngx-owl-carousel';
import { TestComponent } from './test/test.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ContactComponent } from './contact/contact.component';
import { RegionValuePipe } from './region-value.pipe';
import { MainImgPipe } from './main-img.pipe';
import { SearchComponent } from './search/search.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { FormsModule } from '@angular/forms';
import { FindComponent } from './find/find.component';
import { HostComponent } from './host/host.component';
import { PaymentComponent } from './payment/payment.component';
import { ModalComponent } from './_modal/modal.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { LoaderDirective } from './loader.directive';
import { ViewComponent } from './view/view.component';
import { SidebarModule } from 'ng-sidebar';
import { PhotosUploadComponent } from './photos-upload/photos-upload.component';


@NgModule({
  declarations: [
    ModalComponent,
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    AboutComponent,
    BannerComponent,
    MapSectionComponent,
    CardComponent,
    TestComponent,
    ContactComponent,
    RegionValuePipe,
    MainImgPipe,
    SearchComponent,
    SearchResultsComponent,
    FindComponent,
    HostComponent,
    PaymentComponent,
    LoaderDirective,
    ViewComponent,
    PhotosUploadComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    OwlModule,
    HttpClientModule,
    CarouselModule,
    FormsModule,
    NgxSpinnerModule,
    RouterModule.forRoot(appRoutes),
    SidebarModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
