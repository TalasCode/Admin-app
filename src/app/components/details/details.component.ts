import { Component ,OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-product-detailes',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

id:any
item:any ={}
loading : boolean = false;

constructor(private route:ActivatedRoute , private service:ServiceService ){
  this.id = this.route.snapshot.paramMap.get("id")
  console.log(this.id)

}

ngOnInit(): void {
  
  this.getDetails()
}

getDetails(){
  this.loading = true
  this.service.getProductById(this.id).subscribe((res:any) =>{
  this.item = res;
  this.loading = false
  }
  )
  
}

}
