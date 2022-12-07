import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import InstallComponent from './install.component';

@NgModule({
  declarations: [
    InstallComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [InstallComponent],
})
export default class InstallModule { }
