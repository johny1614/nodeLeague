import { NgModule } from '@angular/core';
import { HelloDBHelloColResource } from 'src/app/resources/HelloDB/HelloCol/HelloDBHelloColResource';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  providers: [HelloDBHelloColResource],
  imports: [HttpClientModule]
})
export class HelloDBHelloColResourceModule {

}
