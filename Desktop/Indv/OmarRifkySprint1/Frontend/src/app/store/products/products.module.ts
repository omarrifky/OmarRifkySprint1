import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ProductsRoutingModule } from './products-routing.module';

import { ProductsComponent } from './products.component';

@NgModule({
  imports: [ThemeModule, ProductsRoutingModule],
  declarations: [ProductsComponent],
  providers: []
})
export class ProductsModule {}
