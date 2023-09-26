import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { AllProductComponent } from './components/all-product/all-product.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [
  {path :"product" , component:AllProductComponent},
  {path : "details/:id" , component: DetailsComponent},
  {path : "cart" , component : CartComponent},
  {path : "**" , redirectTo:"cart", pathMatch : "full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
