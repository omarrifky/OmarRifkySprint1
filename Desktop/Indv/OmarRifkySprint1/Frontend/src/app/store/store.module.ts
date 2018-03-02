import { NgModule } from '@angular/core';
import { ThemeModule } from '../@theme/theme.module';

import { StoreRoutingModule } from './store-routing.module';

import { StoreComponent } from './store.component';

@NgModule({
  imports: [ThemeModule, StoreRoutingModule],
  declarations: [StoreComponent],
  entryComponents: [],
  providers: []
})
export class StoreModule {}
