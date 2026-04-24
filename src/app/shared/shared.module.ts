import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    LoaderComponent,
    ModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
