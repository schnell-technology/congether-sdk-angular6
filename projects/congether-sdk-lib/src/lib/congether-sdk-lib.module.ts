import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularClientService } from './AngularClientService';
import { CongetherAngularClient } from './CongetherAngularClient';

@NgModule({
  imports: [
    HttpClientModule
  ],
  declarations: [],
  providers: [AngularClientService, CongetherAngularClient],
  exports:[]
})
export class CongetherSdkLibModule { }
