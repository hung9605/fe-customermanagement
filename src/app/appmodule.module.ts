import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';



@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    RouterLink,
    RouterOutlet
  ],
  bootstrap:[AppComponent]
})
export class AppmoduleModule { }
