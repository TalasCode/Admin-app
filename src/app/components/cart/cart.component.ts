import { Component ,OnInit} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  carts : any[] = [];
  total:any = 0;
  success:boolean = false;
  form!:FormGroup;
  products:any;
  details:any;
  constructor(private Service : ServiceService , private build:FormBuilder){}
  
  ngOnInit(): void {
    this.getAllCarts();

    this.form = this.build.group({
      start:[''],
      end:['']
    })
    
  }


  

  getAllCarts(){

    this.Service.getAllCarts().subscribe((res:any)=>{
      this.carts = res;
    })

  }

  applyFilter(){
    console.log(this.form.value)
    let date = this.form.value;
    return this.Service.getAllCarts(date).subscribe((res:any)=>{
      this.carts = res;
    });
  }

  deleteCart(id:number){
    
    this.Service.DeleteCart(id).subscribe((res:any) =>{
      this.getAllCarts();
      alert("Cart deleted success !!")
    })
  }

  view(Index:number){
    this.products = [];
    this.details = this.carts[Index];
    console.log(this.details.products)
    for(let x in this.details.products){
      this.Service.getProductById(this.details.products[x].productId).subscribe((res:any)=>{
        this.products.push({item:res ,  quantity:this.details.products[x].quantity});
        console.log(res)
      })
    }
    
    
  }

}

