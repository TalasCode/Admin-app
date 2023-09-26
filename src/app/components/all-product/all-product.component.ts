import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/services/service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {
  products: any[] = []
  category: any[] = []
  loading : boolean =false;
  cartProduct: any[] = [];
  base64 : any = '';
  form!:FormGroup;

  constructor(private service: ServiceService ,private build:FormBuilder ) {}

  ngOnInit(): void {

    this.getProducts();
    this.getCategories();
    this.form = this.build.group({
      title: ['' , Validators.required],
      price: ['' , Validators.required],
      description: ['' , Validators.required],
      image: ['' , Validators.required],
      category: ['' , Validators.required]
    })
    
  }

  getProducts() {
    this.loading = true;
    this.service.getAllProducts().subscribe((res:any) => {
      this.loading = false;
      this.products = res;
    }, error =>{
      this.loading = false;
      alert("Error")
    })
  }


  getCategories(){
    this.loading = true;
    this.service.getAllCategories().subscribe((res:any) =>{
      this.loading = false;
      this.category = res;
    }, error =>{
      this.loading = false;
      alert("Error")
    })
  }

  
  SetCategory(event: any) {
    this.form.get('category')?.setValue(event.target.value)
  }

  getProductsCategory(keyword:string){
    
    this.service.getProductsByCategory(keyword).subscribe((res:any) => {
      this.loading = false;
      this.products = res;
    })
  }
  addToCart(event:any){
    if("cart" in localStorage){
      this.cartProduct = JSON.parse(localStorage.getItem("cart")!)
      let exist = this.cartProduct.find(item => item.product.id == event.product.id)
      if(exist) {
        alert("product is already in your cart")
      }
      else{
        this.cartProduct.push(event)
      localStorage.setItem("cart" , JSON.stringify(this.cartProduct))
      }
      
    }else{
      this.cartProduct.push(event)
      localStorage.setItem("cart" , JSON.stringify(this.cartProduct))
    
    }
    
  }

  convertToBase64(event: any){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      this.base64 = reader.result;
      this.form.get('image')?.setValue(this.base64)
    };
  }
  AddProduct(){
    const model = this.form.value;
    this.service.AddNewProduct(model).subscribe(res=>{
      alert("Add Product success!")
    })
    this.service.getAllProducts().subscribe((res:any)=>{
      this.products=res;
    })
    console.log(this.form)
  }
  

}

