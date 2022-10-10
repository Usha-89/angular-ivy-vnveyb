import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { App } from './app.component';
import { HelloComponent } from './hello.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [App, HelloComponent],
  bootstrap: [App],
})
export class AppModule {}
