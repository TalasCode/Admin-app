import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

getAllProducts(){
  return this.http.get('https://fakestoreapi.com/products')
}
getAllCarts(param?:any){
  let params = new HttpParams();
  params = params.append("startDate" , param?.start).append("Enddate",param?.end)
  return this.http.get('https://fakestoreapi.com/carts',{params})
}
getAllCategories(){
  return this.http.get('https://fakestoreapi.com/products/categories')
}

getProductsByCategory(keyword:string){
  return this.http.get('https://fakestoreapi.com/products/category/' + keyword)
}
getProductById(id:any){
  return this.http.get('https://fakestoreapi.com/products/' + id)
}
createCart(model:any){
  return this.http.post("https://fakestoreapi.com/carts" , model )
}
DeleteCart(id:number){
  return this.http.delete('https://fakestoreapi.com/carts/' + id)
}
getSingleCart(id:number){
  return this.http.get('https://fakestoreapi.com/carts/' + id)
}

AddNewProduct(model:any){
  return this.http.post('https://fakestoreapi.com/products',model)
}

}
